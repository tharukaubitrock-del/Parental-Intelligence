// server.js
const express = require('express');
const path    = require('path');

const app = express();

// 1️⃣ Serve all your static files (HTML, CSS, JS, images) from the repo root
app.use(express.static(path.join(__dirname)));

// 2️⃣ Mount your PayHere router
app.use('/api/payhere', require('./routes/payhere'));

// 3️⃣ Fallback: if someone hits “/” without specifying index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4️⃣ Start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});