import express from 'express'
import { getPuntos } from '../services/puntos.js'

const router = express.Router()

router.get('/', (req, res) => {
    getPuntos()
        .then(results => res.json(results))
        .catch(error => res.send(error))
})

export default router