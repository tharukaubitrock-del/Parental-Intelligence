// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');

// --- service account (base64) ---
function loadSA() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!b64) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_BASE64');
  return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
}
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(loadSA()) });
}
const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const userId = event.queryStringParameters?.uid;
  const debug  = event.queryStringParameters?.debug === '1';
  if (!userId) return { statusCode: 400, body: 'Missing uid' };

  // 1) Map order -> user for notify
  const orderId = `sub_${userId}_${Date.now()}`;
  await db.collection('subscriptionOrders').doc(orderId).set({
    userId,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // 2) PayHere fields
  const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
  const amount   = (1000.00).toFixed(2);
  const currency = 'LKR';

  const returnUrl = 'https://chatpi.lk/?status=success';
  const cancelUrl = 'https://chatpi.lk/?status=cancel';
  const notifyUrl = 'https://chatpi.lk/api/payhere/notify';

  // 3) Compute hash exactly per spec
  const secretMd5 = crypto.createHash('md5').update(MERCHANT_SECRET).digest('hex').toUpperCase();
  const hash = crypto.createHash('md5')
    .update(MERCHANT_ID + orderId + amount + currency + secretMd5)
    .digest('hex').toUpperCase();

  // (optional) prefill customer
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

  const material = MERCHANT_ID + orderId + amount + currency + secretMd5;

  // 4) Render page (debug prints values; non-debug auto-submits)
  const body = `<!doctype html><meta charset="utf-8">
  <body style="font:14px system-ui;padding:20px">
    <h3>PayHere Checkout ${debug ? '(debug mode — not submitting)' : ''}</h3>
    <table border="1" cellpadding="6" style="margin-bottom:16px">
      <tr><td>merchant_id</td><td>${MERCHANT_ID}</td></tr>
      <tr><td>order_id</td><td>${orderId}</td></tr>
      <tr><td>amount</td><td>${amount}</td></tr>
      <tr><td>currency</td><td>${currency}</td></tr>
      <tr><td>secretMd5</td><td>${secretMd5}</td></tr>
      <tr><td>hash</td><td>${hash}</td></tr>
      <tr><td>material used for md5</td><td><code>${material}</code></td></tr>
    </table>

    <form id="payhere" method="POST" action="https://sandbox.payhere.lk/pay/checkout">
      <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
      <input type="hidden" name="return_url"  value="${returnUrl}">
      <input type="hidden" name="cancel_url"  value="${cancelUrl}">
      <input type="hidden" name="notify_url"  value="${notifyUrl}">
      <input type="hidden" name="order_id"    value="${orderId}">
      <input type="hidden" name="items"       value="Test Charge">
      <input type="hidden" name="currency"    value="${currency}">
      <input type="hidden" name="amount"      value="${amount}">
      <input type="hidden" name="first_name"  value="${firstName}">
      <input type="hidden" name="last_name"   value="${lastName}">
      <input type="hidden" name="email"       value="${email}">
      <input type="hidden" name="phone"       value="${phone}">
      <input type="hidden" name="address"     value="${address}">
      <input type="hidden" name="city"        value="${city}">
      <input type="hidden" name="country"     value="${country}">
      <input type="hidden" name="custom_1"    value="${userId}">
      <!-- Add recurrence later once checkout works:
      <input type="hidden" name="recurrence" value="1 Month">
      <input type="hidden" name="duration"   value="Forever"> -->
      <input type="hidden" name="hash"        value="${hash}">
    </form>

    ${debug ? '' : '<script>document.getElementById("payhere").submit();</script>'}
  </body>`;

  return { statusCode: 200, headers: { 'Content-Type': 'text/html' }, body };
};