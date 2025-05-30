const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/oauth/callback', (req, res) => {
  const token = req.query.token;
  if (token) {
    console.log('Client token:', token);
    // Here you could store token to file/db for future use
    res.redirect('/dashboard.html');
  } else {
    res.send('Login failed. No token received.');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
