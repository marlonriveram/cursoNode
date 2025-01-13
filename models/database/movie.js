import { randomUUID } from 'node:crypto' // biblioteca nativa de node, para genera id random
import { readJSON } from '../utils.js'
const movies = readJSON('./movies.json')

class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    // Esto va se realiza en la base de datos
    const idNewMovie = randomUUID()// para simulara el id autoIncrement de un base de datos
    const newMovie = { id: idNewMovie, ...input }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const peliculaIndex = movies.findIndex(movie => movie.id === id)

    if (peliculaIndex === -1) return false

    const peliculActulizado = { ...movies[peliculaIndex], ...input }

    movies[peliculaIndex] = peliculActulizado
    return peliculActulizado
  }
}

export { MovieModel }
