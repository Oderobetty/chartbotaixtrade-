const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/auto-withdraw', (req, res) => {
  const { token, amount } = req.body;

  if (!token || !amount) {
    return res.status(400).json({ error: 'Missing token or amount' });
  }

  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=76613');

  ws.on('open', () => {
    ws.send(JSON.stringify({ authorize: token }));
  });

  ws.on('message', (data) => {
    const response = JSON.parse(data);

    if (response.msg_type === 'authorize') {
      ws.send(JSON.stringify({ balance: 1 }));
    }

    if (response.msg_type === 'balance') {
      const available_balance = parseFloat(response.balance.balance);
      const withdraw_amount = parseFloat(amount);
      const fee = 0.5;

      if (withdraw_amount + fee > available_balance) {
        res.status(400).json({ error: 'Insufficient funds after including transaction fee.' });
        ws.close();
        return;
      }

      if (withdraw_amount < 1) {
        res.status(400).json({ error: 'Minimum withdrawal amount is 1 USD.' });
        ws.close();
        return;
      }

      ws.send(JSON.stringify({
        paymentagent_withdraw: 1,
        amount: withdraw_amount,
        currency: 'USD',
        paymentagent_loginid: 'CR5020020',
        verification_code: ''
      }));
    }

    if (response.msg_type === 'paymentagent_withdraw') {
      res.json({ status: 'success', details: response });
      ws.close();
    }

    if (response.error) {
      res.status(500).json({ status: 'error', details: response.error });
      ws.close();
    }
  });

  ws.on('error', (err) => {
    res.status(500).json({ status: 'error', details: err });
  });
});

app.get('/healthz', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));