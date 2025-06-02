const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

appconst express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route (optional)
app.get('/', (req, res) => {
  res.send('QuantumAIXTrade backend is running!');
});

// ✅ OAuth callback route — this is what you were missing
app.get('/callback', (req, res) => {
  const token = req.query.token;
  if (token) {
    console.log('Token received:', token);
    // Redirect client to your frontend app with token as query parameter (optional)
    res.redirect(`https://oderobetty.github.io/chartbotaixtrade?token=${token}`);
  } else {
    res.send('No token received.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
