const fs = require('fs')
const bcrypt = require('bcryptjs')

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

exports.getBearerToken = (authorizationHeaders) => {
  if (authorizationHeaders === null || authorizationHeaders === undefined) {
    throw 'No authorization headers'
  }

  const authToken = authorizationHeaders.toString().trim()
  if (!authToken.toLowerCase().includes('bearer')) {
    throw 'No valid authorization headers, expected Bearer token'
  }

  const [, token] = authToken.split(' ')
  if (token === undefined) {
    throw 'No valid authorization token, expected token value after Bearer'
  }

  return token
}

exports.hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

exports.checkPassword = (password, passwordHashed) => {
  return bcrypt.compareSync(password, passwordHashed)
}
