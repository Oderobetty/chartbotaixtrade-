const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Token receiving endpoint
app.post('/token', (req, res) => {
  const { token } = req.body;
  console.log('✅ Received token:', token);
  // TODO: Save token securely (DB, file, or admin-only dashboard)
  res.sendStatus(200);
});

// Use Render-provided port or fallback for local dev
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});// server.js placeholder
