// netlify/functions/subscribe.js
require('dotenv').config();
const crypto = require('crypto');
const admin  = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
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

  // 1️⃣ Grab the userId from the query string (you passed ?uid=…)
  const userId = event.queryStringParameters?.uid;
  if (!userId) {
    return { statusCode: 400, body: 'Missing user ID in subscribe URL' };
  }

  // 2️⃣ Build a unique orderId and save the mapping
  const orderId = `sub_${userId}_${Date.now()}`;
  await db
    .collection('subscriptionOrders')
    .doc(orderId)
    .set({
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

  // 3️⃣ Compute your PayHere hash
  const MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID;
  const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
  const amount     = (1000.00).toFixed(2);
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
      amount +
      currency +
      secretMd5
    )
    .digest('hex')
    .toUpperCase();

  // 4️⃣ Optionally fetch user info from Firestore to prefill first_name, email, etc.
  const userDoc = await db.collection('users').doc(userId).get();
  const user    = userDoc.exists ? userDoc.data() : {};
  const firstName = (user.fullName||'').split(' ')[0] || '';
  const lastName  = (user.fullName||'').split(' ')[1] || '';
  const email     = user.email || '';
  const phone     = user.phone || '';
  const address   = user.address || '';
  const city      = user.city || '';
  const country   = user.country || 'Sri Lanka';

  // 5️⃣ Render an auto-submitting PayHere form
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `
      <!DOCTYPE html><html><body>
        <form id="payhere" method="POST"
              action="https://sandbox.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value="${MERCHANT_ID}">
          <input type="hidden" name="order_id"    value="${orderId}">
          <input type="hidden" name="items"       value="Monthly Subscription">
          <input type="hidden" name="currency"    value="${currency}">
          <input type="hidden" name="amount"      value="${amount}">
          <input type="hidden" name="recurrence"  value="${recurrence}">
          <input type="hidden" name="duration"    value="${duration}">
          <input type="hidden" name="return_url"  value="${returnUrl}">
          <input type="hidden" name="cancel_url"  value="${cancelUrl}">
          <input type="hidden" name="notify_url"  value="${notifyUrl}">
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