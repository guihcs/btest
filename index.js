import express from 'express'
import { InteractionType, InteractionResponseType } from 'discord-interactions';

const app = express()
const port = process.env.PORT || 3000

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