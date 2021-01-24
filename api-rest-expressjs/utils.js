const fs = require('fs')

/**
 * Ecrit dans un fichier le contenu data et retourne une promesse
 */
exports.writeFile = (file, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })

exports.readFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const todos = JSON.parse(data)
      resolve(todos)
    })
  })
