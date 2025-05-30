const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/oauth/callback", (req, res) => {
  const token = req.query.token;
  if (token) {
    res.send(`
      <h2>Token received successfully!</h2>
      <p>Your OAuth Token: ${token}</p>
      <a href="/">Back to Home</a>
    `);
  } else {
    res.send("<h2>No token received.</h2>");
  }
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
