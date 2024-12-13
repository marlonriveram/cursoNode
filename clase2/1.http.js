const http = require('node:http')
const fs = require('node:fs') // el sitema de archivos de js
const port = process.env.PORT || 12345 // variable de entorno

/* Nota:
    Utilizar setHeader permite al servidor especificar información adicional sobre la respuesta, como el tipo de contenido que se está enviando al cliente.
*/
const procesarReques = (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8') // trata la respuesta como un texto de html

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Bienvenido a mi página web</h1>')
  } else if (req.url === '/imgagen') {
    fs.readFile('./pikachu.png', (err, data) => { // readFile permite leer archivos del sistema diferentes formatos
      if (err) {
        res.statusCode = 500
        res.end('<h1> ERROR 500 CURRE PERRA,CORRE </h1>')
      } else {
        res.setHeader('Content-Type', 'image/png') // este header le dice al navegador q es una imagen
        res.end(data)// data que es la imagen la trae como un buffer
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>Erro : 404 </h1>')
  }
}

const server = http.createServer(procesarReques)

/* Haveces suele pasar que el puerto 3000 ya esta ocupado
    par esos casos se puede poner el puerto "0" que lo que
    hace es eschar en el primer puerto que este vacio
*/

server.listen(port, () => {
  const { port } = server.address()
  console.log(`Escuchando en http://localhost:${port}`)
})
