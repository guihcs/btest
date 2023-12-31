const axios = require('axios');

let commands = [
    {
        name: "test",
        description: "Test server.",
        type: 1
    },
    {
        name: "mute",
        description: "Mute all.",
        type: 1
    },
    {
        name: "unmute",
        description: "Unmute all.",
        type: 1
    }
]

axios.put(`https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`, commands, {
    headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot'
    }
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

