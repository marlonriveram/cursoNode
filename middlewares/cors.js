import cors from 'cors'

/*
  Nota: cors es basicamente falta de cabeceras (headers)
  Dejar cors() con su configuracion por defecto de funcionar funciona
  pero no siempre se quier dar permiso a todo
*/

// lo que hace cors() por defecto es poner todos las cabeceras con (*)

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:35953',
  'http://127.0.0.1:8080',
  'http://movies.com']

/* NOTA: { acceptedOrigins = ACCEPTED_ORIGINS } = {} esto se hace para que al usar
  la funcion se le puedan pasar otro tipo se origenes, si no se pasa el argumeto
  usara ACCEPTD_ORIGINS por defecto,
  ES UN PATRON DE DISEÑO LLAMADO PARAMETRIZACION CON OBJETOS
  */
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({ // ver documentacion de cors
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    callback(new Error('Problamas de Cors'), false)
  }
})
