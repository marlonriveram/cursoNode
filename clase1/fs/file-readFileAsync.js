const fs = require('node:fs')
// read permite leer archivos en diferentes formatos .txt, .pgn, .html etc.

console.log('leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8', (_err, text) => {
  console.log(text)
})

console.log('hacer cosas mientras lee el archivo')

console.log('leyendo el segundo archivo ...')

fs.readFile('./archivo2.txt', 'utf-8', (_err, text) => {
  console.log(text)
})
