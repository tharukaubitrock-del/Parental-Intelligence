// notify.js
require('dotenv').config();
const crypto     = require('crypto');
const qs         = require('querystring');
const admin = require('firebase-admin');

// Robust loader for JSON in env (with \\n)
function loadServiceAccount() {
  let raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT missing');

  // strip accidental outer quotes and unescape inner quotes once
  if (raw.startsWith('"') && raw.endsWith('"')) raw = raw.slice(1, -1);
  raw = raw.replace(/\\"/g, '"');

  const sa = JSON.parse(raw);
  if (sa.private_key && sa.private_key.includes('\\n')) {
    sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  }
  return sa;
}

const serviceAccount = loadServiceAccount();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

exports.handler = async (event) => {
  console.log('🔔 PayHere notify invoked!', event.httpMethod, event.body);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse form-encoded payload
  const data = qs.parse(event.body);

  // Validate MD5 signature
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
  const secretMd5 = crypto.createHash('md5')
    .update(MERCHANT_SECRET)
    .digest('hex')
    .toUpperCase();

  const localMd5sig = crypto.createHash('md5')
    .update(
      data.merchant_id +
      data.order_id +
      data.payhere_amount +
      data.payhere_currency +
      data.status_code +
      secretMd5
    )
    .digest('hex')
    .toUpperCase();

  if (localMd5sig !== data.md5sig) {
    console.error('Signature mismatch', data);
    return { statusCode: 400, body: 'BAD SIGNATURE' };
  }

  // Lookup order to find associated user
  const orderSnap = await db.collection('subscriptionOrders')
    .doc(data.order_id)
    .get();
  if (!orderSnap.exists) {
    console.error('Unknown order_id:', data.order_id);
    return { statusCode: 400, body: 'Unknown order' };
  }
  const { userId } = orderSnap.data();

  // References
  const userRef = db.collection('users').doc(userId);
  const subRef  = userRef.collection('subscriptions').doc(data.subscription_id);

  // Handle events
  if (data.message_type === 'RECURRING_INSTALLMENT_SUCCESS' && data.status_code === '2') {
    // Mark subscription active in subcollection
    await subRef.set({
      subscriptionId: data.subscription_id,
      orderId:        data.order_id,
      status:         'active',
      lastPayment:    {
        id:     data.payment_id,
        amount: Number(data.payhere_amount)
      },
      nextCharge: data.item_rec_date_next,
      updatedAt:  admin.firestore.FieldValue.serverTimestamp()
    });
    // Mark user as subscriber in main user doc
    await userRef.update({
      isSubscriber:   true,
      subscriptionId: data.subscription_id,
      subscribedAt:   admin.firestore.FieldValue.serverTimestamp()
    });

  } else if (data.message_type === 'RECURRING_STOPPED') {
    // Mark subscription canceled in subcollection
    await subRef.update({
      status:    'canceled',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    // Mark user unsubscribed
    await userRef.update({
      isSubscriber:   false,
      unsubscribedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  // Acknowledge receipt to PayHere
  return { statusCode: 200, body: 'OK' };
};
