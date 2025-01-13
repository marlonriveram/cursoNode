import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'

// const movies = readJSON('./movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

// Nota: al consumir un post desde el front se manda en el header el Content-Type:
/* En el metodo Post, nunca se pide el id por body, este se debe crear autimaticamente */
moviesRouter.post('/', MovieController.create)

/* Para hacer una actualizacion se puede usar put o patch
  put: se debe mandar todos los datos a si solo se queiera modificar solo uno
  patch: se debe mandar solo el dato que se quiere modificar
*/
moviesRouter.patch('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.deleted)
