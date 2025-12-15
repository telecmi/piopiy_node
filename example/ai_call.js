const { Piopiy } = require('piopiy');

// Get token from ENV
const token = process.env.PIOPIY_TOKEN;

if (!token) {
    console.error("❌ Error: PIOPIY_TOKEN environment variable is required.");
    process.exit(1);
}

const client = new Piopiy(token);

const options = {
    options: {
        max_duration_sec: 80, // Duration in seconds
        record: true          // Record the call
    },
    variables: {
        customer_id: "CUST_1001",
        campaign: "summer_sale_2025",
        lang: "en-IN",
        priority: 2,
        vip: true
    }
};

// Initiate AI Call
client.ai.call("9198xxxxxx", "9198xxxxxx", "YOUR_AGENT_ID", options)
    .then(res => {
        console.log("✅ Call Initiated:", res);
    })
    .catch(err => {
        console.error("❌ Error:", err);
    });
