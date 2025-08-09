// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');

// --- service account newline fix ---
function loadServiceAccount() {
  const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  if (sa.private_key && sa.private_key.includes('\\n')) {
    sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  }
  return sa;
}
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(loadServiceAccount()) });
}
const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 1) get user id from query
  const userId = event.queryStringParameters?.uid;
  if (!userId) return { statusCode: 400, body: 'Missing uid' };

  // 2) build orderId and persist mapping for notify.js
  const orderId = `sub_${userId}_${Date.now()}`;
  await db.collection('subscriptionOrders').doc(orderId).set({
    userId,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // 3) PayHere fields + hash
  const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

  const amount    = (1000.00).toFixed(2);
  const currency  = 'LKR';
  const recurrence= '1 Month';
  const duration  = 'Forever';

  const secretMd5 = crypto.createHash('md5')
    .update(MERCHANT_SECRET).digest('hex').toUpperCase();

  const hash = crypto.createHash('md5')
    .update(MERCHANT_ID + orderId + amount + currency + secretMd5)
    .digest('hex').toUpperCase();

  const returnUrl = 'https://chatpi.lk/?status=success';
  const cancelUrl = 'https://chatpi.lk/?status=cancel';
  const notifyUrl = 'https://chatpi.lk/api/payhere/notify';

  // (optional) pull user details to prefill
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
  } catch (e) {}

  // 4) render auto-submitting form to the CHECKOUT endpoint
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `<!DOCTYPE html><html><body>
      <form id="payhere" method="POST" action="https://sandbox.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
        <input type="hidden" name="return_url"  value="${returnUrl}">
        <input type="hidden" name="cancel_url"  value="${cancelUrl}">
        <input type="hidden" name="notify_url"  value="${notifyUrl}">
        <input type="hidden" name="order_id"    value="${orderId}">
        <input type="hidden" name="items"       value="Monthly Subscription">
        <input type="hidden" name="currency"    value="${currency}">
        <input type="hidden" name="recurrence"  value="${recurrence}">
        <input type="hidden" name="duration"    value="${duration}">
        <input type="hidden" name="amount"      value="${amount}">
        <input type="hidden" name="first_name"  value="${firstName}">
        <input type="hidden" name="last_name"   value="${lastName}">
        <input type="hidden" name="email"       value="${email}">
        <input type="hidden" name="phone"       value="${phone}">
        <input type="hidden" name="address"     value="${address}">
        <input type="hidden" name="city"        value="${city}">
        <input type="hidden" name="country"     value="${country}">
        <input type="hidden" name="hash"        value="${hash}">
      </form>
      <script>document.getElementById('payhere').submit();</script>
    </body></html>`
  };
};