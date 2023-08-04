import express from 'express'
import cors from 'cors'

import puntos from './rutas/puntos.js'

const app = express()

app.use(cors())
app.use(express.json())

//ping de la api
app.get('/ping', (req, res) => {
    res.send('<h1>Pong</h1><br>Welcome to my API')
})

app.use('/api/puntos', puntos)

app.listen(4000, () => {
    console.log('Server running on port 4000')
})