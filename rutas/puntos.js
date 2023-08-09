import express from 'express'
import * as p from '../services/puntos.js'

const router = express.Router()

router.get('/', (req, res) => {
    p.getPuntos()
        .then(results => res.json(results))
        .catch(error => res.send(error))
})

router.get('/:id', (req, res) => {
    p.getPuntosUser(req.params.id)
        .then(results => res.json(results))
        .catch(error => res.send(error))
})

router.post('/', (req, res) => {
    const fecha = new Date() 
    const { puntos, id_tarjeta } = req.body
    p.postPuntos({ fecha, puntos, estado: 1, id_tarjeta })
        .then(results => {
            console.log(results)
            if(results > 0){
                res.sendStatus(201)
            }
        })
        .catch(error => res.send(error))
})
export default router