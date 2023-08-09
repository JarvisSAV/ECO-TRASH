import conn from "./conexion.js"

export const getPuntos = () => {
    const sql = 'SELECT * FROM puntos'
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

export const getPuntosUser = (id) => {
    const sql = 'SELECT * FROM puntos where id_usuario = ?'
    const datos = [id]
    return new Promise((resolve, reject) => {
        conn.query(sql, datos, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

export const postPuntos = ({ fecha, puntos, estado, id_tarjeta }) => {
    const sql = 'INSERT INTO puntos values (null, ?, ?, ?, ?)'
    const datos = [fecha, puntos, estado, id_tarjeta]
    return new Promise((resolve, reject) => {
        conn.query(sql, datos, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.affectedRows)
            }
        })
    })
}

// console.log(postPuntos({ fecha: '2021-10-10', puntos: 10, estado: 1 }))

// console.log(getPuntos())

// getPuntos()
//     .then(results => console.log(results))
//     .catch(error => console.log(error))