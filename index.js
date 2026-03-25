const bedrock = require('bedrock-protocol');

const HOST = process.env.SERVER_HOST;
const PORT = parseInt(process.env.SERVER_PORT) || 19132;

function startBot() {
    console.log(`🔄 Connecting to ${HOST}:${PORT}...`);

    const client = bedrock.createClient({
        host: HOST,
        port: PORT,
        username: "Bot_" + Math.floor(Math.random() * 1000),

        // 🔥 FIXED VERSION (matches your server)
        version: "1.26.0",

        // 🔐 Microsoft login (saves after first login)
        profilesFolder: "./profiles"
    });

    client.on('connect', () => {
        console.log("✅ Connected to server!");
    });

    client.on('spawn', () => {
        console.log("🌍 Bot spawned in world!");
    });

    client.on('join', () => {
        console.log("👋 Joined successfully!");
    });

    client.on('disconnect', (reason) => {
        console.log("❌ Disconnected:", reason);
    });

    client.on('error', (err) => {
        console.log("❌ Error:", err.message);
    });

    client.on('close', () => {
        console.log("🔄 Reconnecting in 5 seconds...");
        setTimeout(startBot, 5000);
    });
}

// Start bot
startBot();
