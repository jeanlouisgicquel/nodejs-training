const fs = require('fs')
const todosFile = './api-rest-expressjs/data/todos.json'
const NotFoundException = require('../exceptions/not-found-exception')

/**
 * Ecrit dans un fichier le contenu data et retourne une promesse
 */
function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(todosFile, data, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

/**
 * Recherche un todo ayant l'id passé en paramètre
 * @param {number} id id de la todo à rechercher
 * @param {Array} todos liste des todos dans laquelle rechercher
 * @throws {Exception} Lance une erreur si aucune todo n'est trouvée.
 */
function findTodoById(id, todos) {
  const todosFiltered = todos.filter((t) => t.id === id)
  if (todosFiltered.length === 0) {
    throw new NotFoundException()
  }

  return todosFiltered[0]
}

/**
 * Récupère toutes les todos sauvegardées
 * @returns {Array} todos sauvegardées
 */
exports.fetchTodos = async () =>
  new Promise((resolve, reject) => {
    fs.readFile(todosFile, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const todos = JSON.parse(data)
      resolve(todos)
    })
  })

/**
 * Récupère une todo ayant l'id passé en paramètre
 * @param {number} id id de la todo à rechercher
 */
exports.fetchTodoById = async (id) => {
  const todos = await this.fetchTodos()
  return findTodoById(id, todos)
}

/**
 * Enregistre une nouvelle todo
 * @param {object} todo todo à ajouter
 * @return {number} id de la todo nouvellement ajoutée
 */
exports.storeTodo = async (todo) => {
  const todos = await this.fetchTodos()
  const nextTodoId = Math.max(...todos.map((t) => t.id)) + 1
  const todoToStore = {
    ...todo,
    id: nextTodoId,
  }
  todos.push(todoToStore)
  const todosJson = JSON.stringify(todos, null, 2)
  await writeFile(todosJson)
  return nextTodoId
}

/**
 * Met à jour une todo
 * @param {number} id id de la todo à modifier
 * @param {object} todo changement à effectuer sur la todo à modifier
 * @return {void}
 */
exports.updateTodo = async (id, todo) => {
  const todos = await this.fetchTodos(todo.id)
  let todoFound = findTodoById(id, todos)
  todoFound = {
    ...todoFound,
    ...todo,
  }
  const todoIdx = todos.findIndex((t) => t.id === id)
  todos.splice(todoIdx, 1, todoFound)
  await writeFile(JSON.stringify(todos, null, 2))
}

/**
 * Détruit une todo
 * @param {object} todo todo à détruire
 * @return {void}
 */
exports.destroyTodo = async (todo) => {
  const todos = await this.fetchTodos()
  const todosJson = JSON.stringify(
    todos.filter((t) => t.id !== todo.id),
    null,
    2
  )
  await writeFile(todosJson)
}
