// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');


function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT; // JSON string in env
  const sa  = JSON.parse(raw);
  // Convert escaped newlines into real newlines
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
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 1) get user id from query
  const userId = event.queryStringParameters?.uid;
  if (!userId) return { statusCode: 400, body: 'Missing user ID' };

  // 2) build orderId
  const orderId = `sub_${userId}_${Date.now()}`;

  // 🔽🔽 PUT IT RIGHT HERE 🔽🔽
  await db
    .collection('subscriptionOrders')
    .doc(orderId)
    .set({
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  // 🔼🔼 BEFORE computing hash / returning the form 🔼🔼

  // 3) compute hash, build form, etc.
  const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

  const secretMd5 = crypto.createHash('md5')
    .update(MERCHANT_SECRET).digest('hex').toUpperCase();

  const amount   = (1000.00).toFixed(2);
  const currency = 'LKR';
  const hash = crypto.createHash('md5')
    .update(MERCHANT_ID + orderId + amount + currency + secretMd5)
    .digest('hex').toUpperCase();

  const returnUrl = 'https://chatpi.lk/?status=success';
  const cancelUrl = 'https://chatpi.lk/?status=cancel';
  const notifyUrl = 'https://chatpi.lk/api/payhere/notify';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `<!doctype html><html><body>
      <form id="payhere" method="POST" action="https://sandbox.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
        <input type="hidden" name="order_id"    value="${orderId}">
        <input type="hidden" name="items"       value="Monthly Subscription">
        <input type="hidden" name="currency"    value="${currency}">
        <input type="hidden" name="amount"      value="${amount}">
        <input type="hidden" name="recurrence"  value="1 Month">
        <input type="hidden" name="duration"    value="Forever">
        <input type="hidden" name="return_url"  value="${returnUrl}">
        <input type="hidden" name="cancel_url"  value="${cancelUrl}">
        <input type="hidden" name="notify_url"  value="${notifyUrl}">
        <input type="hidden" name="hash"        value="${hash}">
      </form>
      <script>document.getElementById('payhere').submit();</script>
    </body></html>`
  };
};