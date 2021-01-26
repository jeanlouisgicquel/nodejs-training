const jwt = require('../helpers/jwt')
const { getBearerToken } = require('../utils')

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
