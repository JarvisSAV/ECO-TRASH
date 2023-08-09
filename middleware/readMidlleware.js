const read = (request, response, next) => {
    const fecha = new Date()
    const ip = request.ip
    console.log(request.method)
    console.log(request.path)
    console.log(ip)
    console.log(fecha)
    console.log(request.body)
    console.log('------------')
    next()
}

export default read