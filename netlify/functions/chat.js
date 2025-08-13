// netlify/functions/chat.js
require('dotenv').config();
const admin = require('firebase-admin');

function loadSA() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!b64) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_BASE64');
  return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
}
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(loadSA()) });
}
const db = admin.firestore();

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1) Verify Firebase ID token from client
    const authHeader = event.headers.authorization || '';
    const token = (authHeader.startsWith('Bearer ') && authHeader.slice(7)) || null;
    if (!token) return { statusCode: 401, body: 'Missing auth token' };

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    // 2) Is user subscribed?
    const userSnap = await db.collection('users').doc(uid).get();
    const isSubscriber = !!(userSnap.exists && userSnap.data().isSubscriber);

    // 3) Daily limit check for free users (10/day, UTC)
    if (!isSubscriber) {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
      const quotaRef = db.collection('users').doc(uid).collection('quota').doc('daily');

      try {
        await db.runTransaction(async (tx) => {
          const doc = await tx.get(quotaRef);
          let count = 0, date = today;

          if (doc.exists) {
            const d = doc.data();
            if (d.date === today) count = d.count || 0;
          }
          if (count >= 10) {
            throw new admin.firestore.FirestoreError('failed-precondition', 'DAILY_LIMIT_REACHED');
          }
          // increment for this user message
          tx.set(quotaRef, { date, count: count + 1, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
        });
      } catch (e) {
        if (e.code === 'failed-precondition') {
          return { statusCode: 429, body: 'Daily free message limit reached' };
        }
        throw e;
      }
    }

    // 4) Forward to OpenRouter (or your current LLM)
    const { messages } = JSON.parse(event.body || '{}');
    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, body: 'Missing messages' };
    }

    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages,
        max_tokens: 2500,
        temperature: 0.2
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return { statusCode: 502, body: `LLM error: ${errText}` };
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '…';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error('chat function error:', err);
    return { statusCode: 500, body: 'Server error' };
  }
};