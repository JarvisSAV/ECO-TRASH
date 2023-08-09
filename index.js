import express from 'express'
import cors from 'cors'

import puntos from './rutas/puntos.js'
import bote from './rutas/botesBasura.js'
import read from './middleware/readMidlleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(read)

//ping de la api
app.get('/api/ping', (req, res) => {
    res.send('<h1>Pong</h1><br>Welcome to my API')
})

app.use('/api/puntos', puntos)

app.use('/api/bote', bote)

app.use((request, response) => {
    response.status(404).json({
        error: 'not found'
    })
})

app.listen(4000, () => {
    console.log('Server running on port 4000')
})