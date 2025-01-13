import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { appRouter } from './routes/index.js'

const port = process.env.PORT || 3000

const app = express()
app.disable('x-powered-by') // Desabilita el header x-powered-by que por defecto pone express
app.use(json()) // optener los datos que vengan en el body y enviarlo al req.body

app.use(corsMiddleware())

appRouter(app)

app.listen(port, () => {
  console.log('Escuchando en el puerto: http://localhost:' + port)
})
