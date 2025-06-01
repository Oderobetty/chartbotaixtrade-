const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/oauth/callback', (req, res) => {
    const token = req.query.token;
    res.send(`Token received: ${token}`);
});

app.listen(port, () => {
    console.log(`QuantumAIxTrade backend running on port ${port}`);
});
