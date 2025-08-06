// notify.js
const crypto     = require('crypto');
const qs         = require('querystring');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service.json');

// Initialize once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse form-encoded body
  const data = qs.parse(event.body);

  const MERCHANT_SECRET = 'Mjg1NDk0NDk0NzI0NTYzMjQ3MjcyOTAyMjExNTc0MzI4OTcxNzgyNA==';
  const secretMd5 = crypto
    .createHash('md5')
    .update(MERCHANT_SECRET)
    .digest('hex')
    .toUpperCase();

  const localMd5sig = crypto
    .createHash('md5')
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

  // 3️⃣ Find which user this is for
  const orderRef = db.collection('subscriptionOrders').doc(data.order_id);
  const orderSnap = await orderRef.get();
  if (!orderSnap.exists) {
    console.error('Unknown order_id:', data.order_id);
    return { statusCode: 400, body: 'Unknown order' };
  }
  const { userId } = orderSnap.data();

  // 4️⃣ Update the user’s subscriptions
  const subRef = db
    .collection('users')
    .doc(userId)
    .collection('subscriptions')
    .doc(data.subscription_id);

  if (data.message_type === 'RECURRING_INSTALLMENT_SUCCESS' && data.status_code === '2') {
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
  } else if (data.message_type === 'RECURRING_STOPPED') {
    await subRef.update({
      status:    'canceled',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  return { statusCode: 200, body: 'OK' };
};