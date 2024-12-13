const http = require('node:http')
const ditto = require('./pokemon/ditto')
const port = process.env.PORT || 3000
const procesarReques = (req, res) => {
  const { method, url } = req
  console.log(url)
  switch (method) { // routing
    // ruta para el get
    case 'GET':switch (url) {
      case '/pokemon/ditto':
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(ditto))

      default :
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> ERROR 404 </h1>')
    }
      break
    // ruta para el post
    case 'POST':switch (url) {
      case '/pokemon':{
        let body = ''

        //* ** Esto es lo que internamente el middelware  Express.json() ************************************
        // Escuchar el evento data
        req.on('data', chuck => {
          body += chuck.toString()
        })

        // Cuando finaliza el evento de mandar datos
        req.on('end', () => {
          const data = JSON.parse(body)
          // Llamar a una base de datos para guardar los tados
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify(data))
        })
        break
        // **********************************************************************
      }

      default :
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> ERROR 404 </h1>')
    }
  }
}
const server = http.createServer(procesarReques)

server.listen(port, () => {
  const { port } = server.address()
  console.log('Escuchando en http://localhost:' + port)
})
