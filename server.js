const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauth', (req, res) => {
    const token = req.query.token;
    if (token) {
        res.send(`
            <h2>Authorization Successful!</h2>
            <p>Your OAuth Token:</p>
            <code>${token}</code>
        `);
    } else {
        res.send('<h2>No token found in the URL.</h2>');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
