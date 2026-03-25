const bedrock = require('bedrock-protocol');

const HOST = process.env.SERVER_HOST;
const PORT = parseInt(process.env.SERVER_PORT) || 19132;

function createBot(optionsName, options) {
    console.log(`\n🚀 Trying method: ${optionsName}`);

    const client = bedrock.createClient(options);

    client.on('connect', () => {
        console.log(`✅ Connected using ${optionsName}`);
    });

    client.on('spawn', () => {
        console.log(`🌍 Spawned using ${optionsName}`);
    });

    client.on('error', (err) => {
        console.log(`❌ ${optionsName} error:`, err.message);
    });

    client.on('disconnect', (reason) => {
        console.log(`❌ ${optionsName} disconnected:`, reason);
    });

    client.on('close', () => {
        console.log(`🔄 ${optionsName} closed`);
    });
}

function startAllMethods() {
    console.log(`\n🌐 Target: ${HOST}:${PORT}`);

    // 🔹 Method 1 — Offline (cracked servers like Aternos)
    createBot("Offline Mode", {
        host: HOST,
        port: PORT,
        username: "Bot_" + Math.floor(Math.random() * 1000),
        offline: true
    });

    // 🔹 Method 2 — Microsoft login (Xbox auth)
    createBot("Microsoft Auth", {
        host: HOST,
        port: PORT,
        username: "BotMicrosoft",
        profilesFolder: "./profiles",
        authTitle: "0000000048183522"
    });

    // 🔹 Method 3 — Simple fallback
    createBot("Basic Connect", {
        host: HOST,
        port: PORT,
        username: "TestBot"
    });
}

// 🔁 Retry loop
function loop() {
    startAllMethods();

    console.log("\n⏳ Retrying ALL methods in 15 seconds...\n");
    setTimeout(loop, 15000);
}

loop();
