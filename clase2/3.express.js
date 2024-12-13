const express = require('express')
const ditto = require('./pokemon/ditto.js')
const app = express()
app.disable('x-powered-by') // Eliminar esta cabecera por defecto de express

const port = process.env.PORT || 3000

// ******** Middleware ***********************

// NOTA: la req, es unica para cada peticion, no es un objeto global

app.use((req, res, next) => {
  // Trakear la request a una base de datos
  // Validar si el usuario tiene cookies
  console.log('Mi primer middleware en express')

  // Los middleware necesitan el next(), para pasar al siguiente
  next()
})

/*  Express ya tiene un middleware que hace esto llamado express.json()

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['Content-Type'] !== 'application/json') return next()

  let body = ''
  req.on('data', chuck => {
    body += chuck.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)

    // Mutar la request, meter la la data en req.body
    req.body = data
    next()
  })
})

*/

app.use(express.json())

// ***************************************************

// ******* Peticiones HTTP ********************
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // Se deberia guardar en base de datos
  res.status(201).send(req.body)
})

// Ruta por defecto, si no se da ninguna no importa si es get,post,put,pacth, delete
app.use((req, res) => {
  res.status(404).send('<h1> Error : 404 </h1>')
})

// **********************************************
app.listen(port, () => {
  console.log(`Escuchando en el puerto http//:localhost${port}`)
})
