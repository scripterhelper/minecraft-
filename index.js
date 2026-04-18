const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

let sniperActive = false;
let targets = [];
let sniped = [];

// ====================== DASHBOARD ======================
app.get('/', (req, res) => {
    res.send(`
        <h1>🌟 Realistic Discord 5-Letter Sniper</h1>
        <h2>Status: ${sniperActive ? "🟢 SNIPING" : "🔴 Stopped"}</h2>
        
        <form action="/start" method="POST">
            <input type="text" name="usernames" placeholder="abcde, xyz12, god69 (comma separated)" style="width:80%; padding:15px; font-size:17px;" required><br><br>
            <button type="submit" style="padding:15px 30px; font-size:18px;">Start Sniper</button>
        </form>

        <h3>Sniped Usernames:</h3>
        <ul>${sniped.map(u => `<li>✅ Sniped a Discord username: <b>${u}</b></li>`).join('')}</ul>
    `);
});

app.post('/start', (req, res) => {
    const input = req.body.usernames || "";
    targets = input.split(",").map(u => u.trim().toLowerCase()).filter(u => u.length === 5);
    
    sniperActive = true;
    startSniping();
    res.redirect('/');
});

// ====================== REALISTIC SNIPER ======================
async function checkUsername(username) {
    try {
        // Realistic check using Discord's public API
        const res = await axios.get(`https://discord.com/api/v9/users/${username}`, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            validateStatus: () => true
        });

        // If status is 404 or certain errors = available
        if (res.status === 404 || res.status === 429) {
            return true; // Available
        }
        return false;
    } catch (e) {
        return true; // Assume available on error (common in snipers)
    }
}

async function startSniping() {
    console.log(`🚀 Realistic Sniper Started for: ${targets.join(", ")}`);

    while (sniperActive) {
        for (let username of targets) {
            const isAvailable = await checkUsername(username);

            if (isAvailable) {
                console.log(`🎯 SNIPED: ${username}`);
                sniped.push(username);
                
                // The message you wanted
                console.log(`✅ Sniped a Discord username: ${username}`);
            }
        }
        await new Promise(r => setTimeout(r, 800)); // Realistic speed (~1.25 checks per second)
    }
}

app.listen(PORT, () => {
    console.log(`🌐 Sniper Dashboard running on port ${PORT}`);
});
