const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauth', (req, res) => {
  const token = req.query.token;
  res.send(`OAuth Token received: ${token}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
