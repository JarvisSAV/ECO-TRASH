import express from 'express'
import * as b from '../services/botesBasura.js'

const router = express.Router()

router.get('/:id', (req, res) => {
    b.getBote(req.params.id)
        .then(results => res.json(results))
        .catch(error => res.send(error))
})

router.post('/:id', (req, res) => {
    const id = req.params.id
    const { capacidad, estado_actual, tipo, ubicacion } = req.body
    b.postBote({ capacidad, estado_actual, tipo, ubicacion , id})
        .then(results => {
            console.log(results)
            if(results > 0){
                res.sendStatus(200)
            }else{
                res.sendStatus(400)
            }
        })
        .catch(error => res.send(error))
})

export default router