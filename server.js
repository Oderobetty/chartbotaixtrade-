const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('QuantumAIxTrade Backend is Running 🚀');
});

// OAuth callback endpoint example
app.get('/auth', (req, res) => {
  const token = req.query.token;
  console.log('Received OAuth token:', token);
  res.send(`Token received: ${token}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
