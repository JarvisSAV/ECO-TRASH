import mysql from 'mysql2'

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eco-trash',
    port: 3306,
    timezone: '+00:00'
})

conexion.connect((error) => {
    if (error) {
        console.log('Error al conectar a la base de datos', error)
        return
    }
    console.log('Conexión exitosa a la base de datos')
})

export default conexion