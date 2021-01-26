const NotFoundException = require('../exceptions/not-found-exception')
const jwt = require('../helpers/jwt')
const UsersRepository = require('../repositories/usersRepository')

exports.register = async (req, res) => {
  res.json('register')
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.sendStatus(422)
    return
  }

  try {
    const user = await UsersRepository.fetchUserByEmailAndPassword(
      email,
      password
    )
    const accessToken = jwt.generateAccessToken(user)
    console.log('accessToken', accessToken)
    res.json({ accessToken })
  } catch (error) {
    const message = error?.message || 'Error'
    console.error('AuthController.login:', message)
    res.status(error instanceof NotFoundException ? 401 : 500).send({
      message,
    })
  }
}

exports.logout = async (req, res) => {
  res.json('logout')
}
