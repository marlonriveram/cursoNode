const http = require('node:http')
const port = process.env.PORT || 12345 // variable de entorno

const server = http.createServer((req, res) => {
  console.log('conectado')
  res.end('Hola mundo')
})

/* Haveces suele pasar que el puerto 3000 ya esta ocupado
    par esos casos se puede poner el puerto "0" que lo que
    hace es eschar en el primer puerto que este vacio
*/

server.listen(port, () => {
  const { port } = server.address()
  console.log(`Escuchando en http://localhost:${port}`)
})
