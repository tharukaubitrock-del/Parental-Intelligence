// subscribe.js
const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const MERCHANT_ID     = '1231286';
  const MERCHANT_SECRET = 'Mjg1NDk0NDk0NzI0NTYzMjQ3MjcyOTAyMjExNTc0MzI4OTcxNzgyNA==';

  // Build order, hash, etc.
  const orderId    = `sub_${Date.now()}`;
  const amount     = 1000.00;
  const currency   = 'LKR';
  const recurrence = '1 Month';
  const duration   = 'Forever';
  const returnUrl  = 'https://your-netlify-site.netlify.app/?status=success';
  const cancelUrl  = 'https://your-netlify-site.netlify.app/?status=cancel';
  const notifyUrl  = 'https://your-netlify-site.netlify.app/api/payhere/notify';

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

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `
      <!DOCTYPE html><html><body>
      <form id="payhere" method="POST"
        action="https://sandbox.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id"  value="${MERCHANT_ID}">
        <input type="hidden" name="return_url"   value="${returnUrl}">
        <input type="hidden" name="cancel_url"   value="${cancelUrl}">
        <input type="hidden" name="notify_url"   value="${notifyUrl}">
        <input type="hidden" name="order_id"     value="${orderId}">
        <input type="hidden" name="items"        value="Monthly Subscription">
        <input type="hidden" name="currency"     value="${currency}">
        <input type="hidden" name="recurrence"   value="${recurrence}">
        <input type="hidden" name="duration"     value="${duration}">
        <input type="hidden" name="amount"       value="${amount.toFixed(2)}">
        <input type="hidden" name="first_name"   value="">
        <input type="hidden" name="last_name"    value="">
        <input type="hidden" name="email"        value="">
        <input type="hidden" name="hash"         value="${hash}">
      </form>
      <script>document.getElementById('payhere').submit();</script>
      </body></html>`
  };
};