const jwt = require('jsonwebtoken')
const accessTokenSecret = 'youraccesstokensecret'

exports.getAuthUserFromToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        reject('Bad token')
      }

      return resolve(user)
    })
  })

exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessTokenSecret
  )
}
