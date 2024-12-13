const fs = require('node:fs')
// read permite leer archivos en diferentes formatos .txt, .pgn, .html etc.

console.log('leyendo el primer archivo ...')
const text = fs.readFileSync('./archivo.txt', 'utf-8') // se pune utf-8, por que normalmete devuelve un buffer de bites

console.log(text)

console.log('leyendo el segundo archivo ...')
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(secondText)
