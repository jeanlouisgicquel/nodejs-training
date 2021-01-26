const NotFoundException = require('../exceptions/not-found-exception')
const jwt = require('../helpers/jwt')
const { getBearerToken } = require('../utils')

module.exports = async function (socket, next) {
  try {
    const token = getBearerToken(socket.handshake.headers.authorization)
    socket.authUser = await jwt.getAuthUserFromToken(token)
    next()
  } catch (error) {
    console.error(error)
    next(new NotFoundException())
    return
  }
}
