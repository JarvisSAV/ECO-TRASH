import conn from "./conexion.js"

export const getPuntos = () => {
    const sql = 'SELECT * FROM puntos'
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results) => {
            if (error) {
                reject('Error al obtener los puntos')
            } else {
                resolve(results)
            }
        })
    })
}

export const postPuntos = ({ fecha, puntos, estado }) => {
    const sql = 'INSERT INTO puntos values (null, ?, ?, ?)'
    const datos = [fecha, puntos, estado]
    return new Promise((resolve, reject) => {
        conn.query(sql, datos, (error, results) => {
            if (error) {
                reject('Error al insertar los puntos')
            } else {
                resolve(results.affectedRows)
            }
        })
    })
}

// console.log(postPuntos({ fecha: '2021-10-10', puntos: 10, estado: 1 }))

// console.log(getPuntos())

getPuntos()
    .then(results => console.log(results))
    .catch(error => console.log(error))