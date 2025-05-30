const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Example WebSocket setup if needed later
// const WebSocket = require('ws');
// const wsServer = new WebSocket.Server({ noServer: true });

app.get('/', (req, res) => {
  res.send('✅ Deriv Backend is running fine!');
});

// Health check for Render
app.get('/healthz', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});