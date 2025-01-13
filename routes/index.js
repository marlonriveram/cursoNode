import { moviesRouter } from './movies.js'

function appRouter (app) {
  return (
    app.use('/movies', moviesRouter)
  )
}

export { appRouter }
