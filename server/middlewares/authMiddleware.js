const jwt = require('../helpers/jwt')

function getBearerToken(authorizationHeaders) {
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

module.exports = async function (req, res, next) {
  try {
    const token = getBearerToken(req.headers.authorization)
    req.user = await jwt.getAuthUserFromToken(token)
    next()
  } catch (error) {
    res.sendStatus(403)
    console.error(error)
    return
  }
}
