const express = require('express')
const { InteractionType, InteractionResponseType } = require('discord-interactions')
const { verifyDiscordRequest } = require('./discord.js')
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
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'mute',
                },
            });
        } else if (name === 'unmute') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'unmute',
                },
            });
        }
    }

})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})