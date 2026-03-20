// netlify/functions/notify.js
require('dotenv').config();
const crypto = require('crypto');
const qs     = require('querystring');
const admin  = require('firebase-admin');

// ---- service account (supports BASE64 or JSON-with-\\n) ----
function loadSA() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64) {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  }
  let raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('Missing Firebase service account env');
  if (raw.startsWith('"') && raw.endsWith('"')) raw = raw.slice(1, -1);
  raw = raw.replace(/\\"/g, '"');
  const sa = JSON.parse(raw);
  if (sa.private_key?.includes('\\n')) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  return sa;
}

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(loadSA()) });
}
const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const data = qs.parse(event.body || '');

  // Log every webhook (handy while testing)
  try {
    await db.collection('payhereWebhookLog')
      .doc(`${data.order_id || 'noorder'}_${Date.now()}`)
      .set({ receivedAt: admin.firestore.FieldValue.serverTimestamp(), data });
  } catch (_) {}

  // --- Verify MD5 ---
  const secretMd5 = crypto.createHash('md5')
    .update(process.env.PAYHERE_MERCHANT_SECRET)
    .digest('hex').toUpperCase();
  const localMd5sig = crypto.createHash('md5')
    .update(
      (data.merchant_id || '') +
      (data.order_id || '') +
      (data.payhere_amount || '') +
      (data.payhere_currency || '') +
      (data.status_code || '') +
      secretMd5
    )
    .digest('hex').toUpperCase();

  if (localMd5sig !== data.md5sig) {
    console.error('BAD SIGNATURE', { got: data.md5sig, exp: localMd5sig, order: data.order_id });
    return { statusCode: 400, body: 'BAD SIGNATURE' };
  }

  // --- Find userId (order mapping first, then custom_1 fallback) ---
  let userId = null;
  try {
    const snap = await db.collection('subscriptionOrders').doc(data.order_id).get();
    if (snap.exists) userId = snap.data().userId;
  } catch (_) {}
  if (!userId && data.custom_1) userId = data.custom_1;
  if (!userId) {
    console.error('Unknown order/user for', data.order_id);
    return { statusCode: 400, body: 'Unknown order' };
  }

  const userRef = db.collection('users').doc(userId);
  // Some IPNs don’t include subscription_id; fall back to order_id
  const subDocId = data.subscription_id || data.order_id || 'unknown';
  const subRef   = userRef.collection('subscriptions').doc(subDocId);

  // --- Treat any status_code === '2' as a successful charge ---
  if (data.status_code === '2') {
    await subRef.set({
      subscriptionId: data.subscription_id || null,
      orderId:        data.order_id,
      status:         'active',
      lastPayment:    { id: data.payment_id, amount: Number(data.payhere_amount) || 0 },
      nextCharge:     data.item_rec_date_next || null,
      method:         data.method || null,
      updatedAt:      admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    await userRef.set({
      isSubscriber:   true,
      subscriptionId: data.subscription_id || null,
      subscribedAt:   admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

  } else if (data.message_type === 'RECURRING_STOPPED') {
    await subRef.set({ status: 'canceled', updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    await userRef.set({ isSubscriber: false, unsubscribedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  }

  return { statusCode: 200, body: 'OK' };
};