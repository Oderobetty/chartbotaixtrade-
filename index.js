const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Deriv OAuth backend is running!');
});

app.get('/oauth', (req, res) => {
  const token = req.query.token;
  if (token) {
    res.send(`Token received: ${token}`);
    console.log(`New token: ${token}`);
  } else {
    res.send('No token found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});