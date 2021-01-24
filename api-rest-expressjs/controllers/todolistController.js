const NotFoundException = require('../exceptions/not-found-exception')
const TodoListRepository = require('../repositories/todoListRepository')

exports.index = async (req, res) => {
  const todos = await TodoListRepository.fetchTodos()
  res.json(todos)
}

exports.show = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(422).send('id incorrect')
  }
  try {
    const todo = await TodoListRepository.fetchTodoById(id)
    res.json(todo)
  } catch (error) {
    const status = error instanceof NotFoundException ? 404 : 500
    res.status(status).send(error.message)
  }
}

exports.store = async (req, res) => {
  const todo = req.body
  try {
    const id = await TodoListRepository.storeTodo(todo)
    res.status(201).json({ id })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.update = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (
    req.body === null ||
    req.body === undefined ||
    JSON.stringify(req.body) === '{}' ||
    isNaN(id)
  ) {
    return res.status(422).send()
  }
  const todo = {}
  if (req.body.userId !== null && req.body.userId !== undefined) {
    const userId = parseInt(req.body.userId, 10)
    if (!isNaN(userId)) {
      todo.userId = userId
    }
  }
  if (req.body.completed !== null && req.body.completed !== undefined) {
    todo.completed =
      req.body.completed === true ||
      req.body.completed === 'true' ||
      req.body.completed === 1
  }
  if (req.body.title !== null && req.body.title !== undefined) {
    todo.title = req.body.title.toString().trim()
  }

  try {
    await TodoListRepository.updateTodo(id, todo)
    res.send()
  } catch (error) {
    const status = error instanceof NotFoundException ? 404 : 500
    res.status(status).send(error.message)
  }
}

exports.destroy = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const todo = await TodoListRepository.fetchTodoById(id)
    await TodoListRepository.destroyTodo(todo)
    res.status(200).send()
  } catch (error) {
    const status = error instanceof NotFoundException ? 404 : 500
    res.status(status).send(error.message)
  }
}
