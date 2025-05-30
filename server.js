const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

app.get("/oauth", (req, res) => {
  const token = req.query.token;
  if (!token) return res.send("Authorization failed. No token received.");
  
  // Proceed to withdrawals or other operations
  withdrawFunds(token);
  res.send("Login successful. Withdrawal process initialized.");
});

function withdrawFunds(token) {
  const ws = new WebSocket("wss://ws.deriv.com/websockets/v3");

  ws.onopen = () => {
    console.log("Connected to Deriv API");
    
    // Get payment agents for Kenya (currency: USD)
    ws.send(JSON.stringify({ paymentagent_list: "KE", currency: "USD", passthrough: { stage: "list_agents" }, req_id: 1 }));
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    console.log(data);

    if (data.msg_type === "paymentagent_list" && data.paymentagent_list.agents.length) {
      const agent = data.paymentagent_list.agents[0];
      const agentLoginId = agent.loginid;

      // Withdraw 1 USD to that agent
      ws.send(JSON.stringify({
        paymentagent_withdraw: 1,
        currency: "USD",
        amount: 1,
        paymentagent_loginid: agentLoginId,
        verification_code: "cr5020020",
        passthrough: { stage: "withdraw" },
        req_id: 2,
        authorize: token
      }));
    }
  };

  ws.onerror = (err) => {
    console.error("WebSocket error: ", err);
  };
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
