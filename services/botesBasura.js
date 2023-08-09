import conn from "./conexion.js"

export const getBote = (id) => {
    const sql = 'SELECT * FROM bate_de_basura where id = ?'
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

export const postBote = ({ capacidad, ubicacion, tipo, estado_actual, id }) => {
    const sql = 'update bate_de_basura set estado_actual = ? where id = ?'
    const datos = [estado_actual, id]
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
