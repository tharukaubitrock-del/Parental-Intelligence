// notify.js
const crypto     = require('crypto');
const qs         = require('querystring');

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

  // TODO: update your DB based on data.message_type

  return { statusCode: 200, body: 'OK' };
};