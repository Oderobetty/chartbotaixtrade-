const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Save token endpoint
app.post('/save-token', (req, res) => {
  const token = req.body.token;
  console.log('✅ Token received from frontend:', token);
  res.send('Token received!');
});

// Optional health check route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
