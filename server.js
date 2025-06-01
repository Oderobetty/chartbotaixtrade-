const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// OAuth callback endpoint
app.get('/callback', (req, res) => {
    const token = req.query.token;
    if (token) {
        console.log("✅ Token received:", token);
        // Redirect client to Deriv main app
        return res.redirect('https://app.deriv.com/');
    } else {
        console.log("❌ No token received.");
        return res.send('❌ No token received.');
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('🎉 QuantumAIxTrade backend is live');
});

app.listen(PORT, () => {
    console.log(`✅ QuantumAIxTrade backend running on port ${PORT}`);
});
