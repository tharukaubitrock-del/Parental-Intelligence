// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');

// Service account from Netlify env (supports BASE64 or raw JSON)
function loadSA() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64) {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  }

  let raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    if (raw.startsWith('"') && raw.endsWith('"')) raw = raw.slice(1, -1);
    raw = raw.replace(/\\"/g, '"');

    const sa = JSON.parse(raw);
    if (sa.private_key?.includes('\\n')) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    return sa;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID ||
    (clientEmail && clientEmail.includes('@')
      ? clientEmail.split('@')[1].replace('.iam.gserviceaccount.com', '')
      : '');
  if (projectId && clientEmail && privateKey) {
    if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  throw new Error('Missing Firebase service account env');
}

function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(loadSA()) });
  }
  return admin.firestore();
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const db = getDb();

    // who is subscribing (from client)
    const userId = event.queryStringParameters?.uid;
    if (!userId) return { statusCode: 400, body: 'Missing uid' };

    // map order -> user so notify can find them
    const orderId = `sub_${userId}_${Date.now()}`;
    await db.collection('subscriptionOrders').doc(orderId).set({
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // PayHere fields
    const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
    const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
    if (!MERCHANT_ID || !MERCHANT_SECRET) {
      return { statusCode: 500, body: 'Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET' };
    }

    const amount     = (499.00).toFixed(2); // string with 2dp
    const currency   = 'LKR';
    const recurrence = '1 Month';
    const duration   = 'Forever';

    const returnUrl  = 'https://chatpi.lk/?status=success';
    const cancelUrl  = 'https://chatpi.lk/?status=cancel';
    const notifyUrl  = 'https://chatpi.lk/api/payhere/notify';

    // hash = UPPER(md5(merchant_id + order_id + amount + currency + UPPER(md5(secret))))
    const secretMd5 = crypto.createHash('md5')
      .update(MERCHANT_SECRET).digest('hex').toUpperCase();
    const hash = crypto.createHash('md5')
      .update(MERCHANT_ID + orderId + amount + currency + secretMd5)
      .digest('hex').toUpperCase();

    // (optional) prefill customer details from Firestore
    let firstName='', lastName='', email='', phone='', address='', city='', country='Sri Lanka';
    try {
      const snap = await db.collection('users').doc(userId).get();
      if (snap.exists) {
        const u = snap.data();
        const parts = (u.fullName || '').split(' ');
        firstName = parts[0] || '';
        lastName  = parts.slice(1).join(' ') || '';
        email     = u.email  || '';
        phone     = u.phone  || '';
        address   = u.address|| '';
        city      = u.city   || '';
        country   = u.country|| 'Sri Lanka';
      }
    } catch {}

    // render auto-submitting checkout form (SANDBOX)
    const html = `<!doctype html><meta charset="utf-8">
    <body>
      <form id="payhere" method="POST" action="https://www.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
        <input type="hidden" name="return_url"  value="${returnUrl}">
        <input type="hidden" name="cancel_url"  value="${cancelUrl}">
        <input type="hidden" name="notify_url"  value="${notifyUrl}">
        <input type="hidden" name="order_id"    value="${orderId}">
        <input type="hidden" name="items"       value="Monthly Subscription">
        <input type="hidden" name="currency"    value="${currency}">
        <input type="hidden" name="amount"      value="${amount}">
        <input type="hidden" name="recurrence"  value="${recurrence}">
        <input type="hidden" name="duration"    value="${duration}">
        <input type="hidden" name="first_name"  value="${firstName}">
        <input type="hidden" name="last_name"   value="${lastName}">
        <input type="hidden" name="email"       value="${email}">
        <input type="hidden" name="phone"       value="${phone}">
        <input type="hidden" name="address"     value="${address}">
        <input type="hidden" name="city"        value="${city}">
        <input type="hidden" name="country"     value="${country}">
        <input type="hidden" name="custom_1"    value="${userId}">
        <input type="hidden" name="hash"        value="${hash}">
      </form>
      <script>document.getElementById('payhere').submit();</script>
    </body>`;
    return { statusCode: 200, headers: { 'Content-Type':'text/html' }, body: html };
  } catch (err) {
    console.error('subscribe function error:', err);
    return { statusCode: 500, body: err?.message || 'Server error' };
  }
};
