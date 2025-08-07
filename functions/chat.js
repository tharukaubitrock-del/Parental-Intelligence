// netlify/functions/chat.js
// Serverless function to proxy OpenRouter calls and keep API key secret
require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { messages } = JSON.parse(event.body);
    const API_KEY = process.env.OPENROUTER_KEY;

    const openRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages,
        max_tokens: 2500,
        temperature: 0.2,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        repetition_penalty: 1.1
      })
    });

    const body = await openRes.text();
    return { statusCode: openRes.status, body };
  } catch (err) {
    console.error('Chat function error:', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};