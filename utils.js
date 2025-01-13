// como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer un json en ESModules por ahora forma recomendada
import { createRequire } from 'node:module'

/* Nota: impor tiene metodos para conocer cosas de nuestro propio proyecto
  import.meta.url --> tiene la direccion del archivo  actual
*/
const require = createRequire(import.meta.url) // se crea la fucion require ya que ESModule no la tiene
export const readJSON = (path) => require(path)
