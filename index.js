const express = require('express')
const { InteractionType, InteractionResponseType } = require('discord-interactions')
const { verifyDiscordRequest } = require('./discord.js')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/interactions', async (req, res) => {
    const { type, id, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
        if (name === 'test') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'test',
                },
            });
        } else if (name === 'mute') {

            let users = await axios.get('https://discord.com/api/v10/guilds/1157450701207769181/members?limit=1000', {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'User-Agent': 'DiscordBot'
                }
            })

            let selectedUsers = users.data.filter((user) => {
                return user.roles.includes('1159201118979637288')
            })

            for (const user of selectedUsers) {
                await axios.patch(`https://discord.com/api/v10/guilds/1157450701207769181/members/${user.user.id}`, {
                    mute: true
                }, {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                        'User-Agent': 'DiscordBot'
                    }
                })
            }


            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Cala a boca seus cavalo.',
                },
            });
        } else if (name === 'unmute') {

            let users = await axios.get('https://discord.com/api/v10/guilds/1157450701207769181/members?limit=1000', {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'User-Agent': 'DiscordBot'
                }
            })

            let selectedUsers = users.data.filter((user) => {
                return user.roles.includes('1159201118979637288')
            })

            for (const user of selectedUsers) {
                await axios.patch(`https://discord.com/api/v10/guilds/1157450701207769181/members/${user.user.id}`, {
                    mute: false
                }, {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                        'User-Agent': 'DiscordBot'
                    }
                })
            }

            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Pode falar agora vcs é lindo.',
                },
            });
        }
    }

})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})