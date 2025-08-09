// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');

// init firebase admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
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
  const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

  // Build order, hash, etc.
  const amount     = 1000.00;
  const currency   = 'LKR';
  const recurrence = '1 Month';
  const duration   = 'Forever';
  const returnUrl  = 'https://chatpi.lk/?status=success';
  const cancelUrl  = 'https://chatpi.lk/?status=cancel';
  const notifyUrl  = 'https://chatpi.lk/api/payhere/notify';

  const secretMd5 = crypto
    .createHash('md5')
    .update(MERCHANT_SECRET)
    .digest('hex')
    .toUpperCase();

  const hash = crypto
    .createHash('md5')
    .update(
      MERCHANT_ID +
      orderId +
      amount.toFixed(2) +
      currency +
      secretMd5
    )
    .digest('hex')
    .toUpperCase();

  // TODO: replace these with real user data from your auth/session layer
  const firstName = 'Test';
  const lastName  = 'User';
  const email     = 'testuser@example.com';
  const phone     = '0771234567';
  const address   = '123 Test Street';
  const city      = 'Colombo';
  const country   = 'Sri Lanka';
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `
      <!DOCTYPE html>
      <html><body>
        <form id="payhere" method="POST"
              action="https://sandbox.payhere.lk/pay/o8b4bd664">
          <!-- Merchant & Order -->
          <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
          <input type="hidden" name="order_id"    value="${orderId}">
          <input type="hidden" name="items"       value="Monthly Subscription">
          <input type="hidden" name="currency"    value="${currency}">
          <input type="hidden" name="amount"      value="${amount.toFixed(2)}">
          <input type="hidden" name="recurrence"  value="${recurrence}">
          <input type="hidden" name="duration"    value="${duration}">

          <!-- URLs -->
          <input type="hidden" name="return_url"  value="${returnUrl}">
          <input type="hidden" name="cancel_url"  value="${cancelUrl}">
          <input type="hidden" name="notify_url"  value="${notifyUrl}">

          <!-- Customer Details (all required) -->
          <input type="hidden" name="first_name"  value="${firstName}">
          <input type="hidden" name="last_name"   value="${lastName}">
          <input type="hidden" name="email"       value="${email}">
          <input type="hidden" name="phone"       value="${phone}">
          <input type="hidden" name="address"     value="${address}">
          <input type="hidden" name="city"        value="${city}">
          <input type="hidden" name="country"     value="${country}">

          <!-- Security hash -->
          <input type="hidden" name="hash"        value="${hash}">
        </form>
        <script>document.getElementById('payhere').submit();</script>
      </body></html>`
  };
};