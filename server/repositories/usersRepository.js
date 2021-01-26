const usersFile = './data/users.json'
const NotFoundException = require('../exceptions/not-found-exception')
const { readFile, checkPassword } = require('../utils')

/**
 * Recherche un user ayant l'id passé en paramètre
 * @param {number} id id du user à rechercher
 * @param {Array} users liste des users dans laquelle rechercher
 * @throws {Exception} Lance une erreur si aucun user n'est trouvé.
 */
function findUserById(id, users) {
  const usersFiltered = users.filter((t) => t.id === id)
  if (usersFiltered.length === 0) {
    throw new NotFoundException()
  }

  return usersFiltered[0]
}

/**
 * Récupère toutes les users sauvegardées
 * @returns {Array} users sauvegardées
 */
exports.fetchUsers = async () => readFile(usersFile)

/**
 * Récupère un user ayant l'id passé en paramètre
 * @param {number} id id du user à rechercher
 */
exports.fetchUserById = async (id) => {
  const users = await this.fetchUsers()
  return findUserById(id, users)
}

/**
 * Récupère un user ayant l'email et le mot de passe passé en paramètre
 * @param {number} id id du user à rechercher
 */
exports.fetchUserByEmailAndPassword = async (email, password) => {
  const users = await this.fetchUsers()
  const user = users.find(
    (t) => t.email === email && checkPassword(password, t.password)
  )
  if (user === undefined) {
    throw new NotFoundException()
  }

  return user
}
