// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route — for health check
app.get('/', (req, res) => {
  res.send('✅ QuantumAIXTrade backend is up and running!');
});

// OAuth callback route
app.get('/callback', (req, res) => {
  const token = req.query.token;
  if (token) {
    console.log('🎉 Token received:', token);
    // Redirect to your frontend app with the token attached
    res.redirect(`https://oderobetty.github.io/chartbotaixtrade?token=${token}`);
  } else {
    res.send('No token received.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
