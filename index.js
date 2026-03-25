const bedrock = require('bedrock-protocol');

const HOST = process.env.SERVER_HOST || "localhost";
const PORT = parseInt(process.env.SERVER_PORT) || 19132;

const RETRY_DELAY = 20000; // 20 seconds after Microsoft login

function startBot() {
    console.log(`🌐 Connecting to ${HOST}:${PORT}...`);

    const client = bedrock.createClient({
        host: HOST,
        port: PORT,
        username: "Bot_" + Math.floor(Math.random() * 1000),
        version: "1.26.0",
        profilesFolder: "./profiles" // saves Microsoft login
    });

    client.on('connect', () => {
        console.log("✅ Connected to server!");
    });

    client.on('spawn', () => {
        console.log("🌍 Spawned in world!");
    });

    client.on('disconnect', (reason) => {
        console.log("❌ Disconnected:", reason);
    });

    client.on('error', (err) => {
        console.log("⚠️ Error:", err.message);
    });

    client.on('close', () => {
        console.log(`🔄 Waiting ${RETRY_DELAY/1000}s before reconnecting...`);
        setTimeout(startBot, RETRY_DELAY);
    });
}

// Start the bot
startBot();
