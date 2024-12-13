// el sitema de archivos de js
const fs = require('node:fs')

// stat() permite obtener informacion de un archivo o carpeta del sistema de archivos
const stats = fs.statSync('./archivo.txt') // con Sync se corre de forma sincrona

console.log(
  stats.isFile(), // si es un archivo
  stats.isDirectory(), // si es una carpeta
  stats.isSymbolicLink(), // si es un enlace simbolico
  stats.size// tamaño en bytes
)
