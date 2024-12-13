const express = require('express')
const crypto = require('node:crypto') // biblioteca nativa de node, para genera id random
const app = express()
const movies = require('./movies.json')
const { validacionCreateMovie, validacionUpdateMovie } = require('./schemas/schema')

const port = process.env.PORT || 3000
app.disable('x-powered-by') // Desabilita el header x-powered-by que por defecto pone express

app.use(express.json()) // opter los datos que vengan del req.body

/* No siempre se pone (*), para darle permiso a todos los dominio
  se puede hacer un array con los dominios permitidos asi
*/

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:35953',
  'http://127.0.0.1:8080',
  'http://movies.com']

// metodos Normales : GET/HEAD/POST
// metodos Complejos : PATCH/PUT/DELETE

/* Los metodos complejos existe algo llamado CORS PRE-Fligth
  estos metodos necestan una peticio especial llamada OPTIONS
  es como una peticion previa antes de hace el metodo complejo
*/

/* Nota: AL FINAL DE TODO CUANDO SE HABLE DE CORS NO ES MAS QUE PROBLEMAS DE CABECERAS HEADERS */

app.get('/movies', (req, res) => {
  // este header permite, el acceso con (*) el acceso a todos los origines desconocidos
  const origin = req.header('origin') // obtener el origin de donde se reliza la peticion

  // cuando se esta en el mismo origin el res.header no lo atrae por eso
  // si !origin significa que esta en su mismo origin, por lo que debe entar tambien el if
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (!genre) {
    res.status(200).json(movies)
  } else {
    const moviesGenre = movies.filter(movie =>
      // tolowerCase se usa para compara los generos todo en minuscula
      movie.genre.some(genres => genres.toLowerCase() === genre.toLocaleLowerCase()))

    if (moviesGenre.length > 0) return res.status(200).json(moviesGenre)
    res.status(404).json({ message: 'Genre Not Found' })
  }
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params

  const pelicula = movies.filter(movie => movie.id === id)
  if (pelicula.length > 0) return res.status(200).json(pelicula)

  res.status(404).json({ message: 'Not Found' })
})

// Nota: al consumir un post desde el front se manda en el header el Content-Type:
/* En el metodo Post, nunca se pide el id por body, este se debe crear autimaticamente */

app.post('/movies', (req, res) => {
  const resultado = validacionCreateMovie(req.body)

  if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  // Esto va se realiza en la base de datos
  const idNewMovie = crypto.randomUUID()// para simulara el id autoIncrement de un base de datos
  const newMovie = { id: idNewMovie, ...resultado.data }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

/* Para hacer una actualizacion se puede usar put o patch
  put: se debe mandar todos los datos a si solo se queiera modificar solo uno
  patch: se debe mandar solo el dato que se quiere modificar
*/

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const resultado = validacionUpdateMovie(req.body)

  const pelicula = movies.find(movie => movie.id === id)
  if (!pelicula) {
    return res.status(404).json({ message: 'Pelicula not found' })
  } else if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  const peliculActulizado = { ...pelicula, ...resultado.data }

  return res.status(200).json(peliculActulizado)
})

app.options('*', (req, res) => {
  const origin = req.header('origin') // obtener el origin de donde se reliza la peticion
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  }
  res.sendStatus(200) // Sin contenido
})

app.delete('/movies/:id', (req, res) => {
  // este header permite, el acceso con (*) el acceso a todos los origines desconocidos
  const origin = req.header('origin') // obtener el origin de donde se reliza la peticion

  // cuando se esta en el mismo origin el res.header no lo atrae por eso
  // si !origin significa que esta en su mismo origin, por lo que debe entar tambien el if
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie delete' })
})

app.listen(port, () => {
  console.log('Escuchando en el puerto: http://localhost:' + port)
})
