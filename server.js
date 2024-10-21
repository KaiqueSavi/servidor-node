import express from 'express';
import { DatabaseMemory } from './database-memory.js'
const app = express()
app.use(express.json())
const port = 3000
const database = new DatabaseMemory()

app.post('/videos', (req, res) => {

    const { title, description, duration } = req.body

        database.create({
            title,
            description,
            duration,
        })

    return res.status(201).send()
})

app.get('/videos', (req, res) => {
    const videos = database.list()

    return res.json(videos).send()
})

app.put('/videos/:id', (req, res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return res.status(204).send()
})

app.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id

    database.delete(videoId)

    return res.status(204).send()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})