import { MovieModel } from '../models/movie.js'
import { validacionCreateMovie, validacionUpdateMovie } from '../schemas/schema.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query

    const movies = await MovieModel.getAll({ genre })

    if (movies.length === 0) return res.status(400).json({ message: 'Genre not found' })
    res.status(200).json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params

    const movie = await MovieModel.getById({ id })
    if (!movie) return res.status(404).json({ message: 'Not Found' })

    res.status(200).json(movie)
  }

  static async create (req, res) {
    const resultado = validacionCreateMovie(req.body)

    if (!resultado.success) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newMovie = await MovieModel.create({ input: resultado.data })

    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params
    const resultado = validacionUpdateMovie(req.body)

    if (!resultado.success) return res.status(400).json({ error: JSON.parse(resultado.error.message) })

    const movieUpdated = await MovieModel.update({ id, input: resultado.data })

    if (!movieUpdated) return res.status(400).json({ message: 'Movie not found' })

    res.status(200).json(movieUpdated)
  }

  static async deleted (req, res) {
    const { id } = req.params

    const movieDeleted = await MovieModel.delete({ id })

    if (!movieDeleted) return res.status(400).json({ message: 'Movie not found' })

    res.status(200).json({ message: 'Movie deleted' })
  }
}
