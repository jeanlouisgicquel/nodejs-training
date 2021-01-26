const NotFoundException = require('../exceptions/not-found-exception')
const TodoListRepository = require('../repositories/todoListRepository')

exports.index = async (req, res) => {
  const isAdmin = req.user.id === 999
  const todos = isAdmin
    ? await TodoListRepository.fetchTodos()
    : await TodoListRepository.fetchTodosBy({
        userId: req.user.id,
      })
  res.json(todos)
}

exports.show = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(422).send('id incorrect')
  }
  const isAdmin = req.user.id === 999
  try {
    const todo = isAdmin
      ? await TodoListRepository.fetchTodoById(id)
      : await TodoListRepository.fetchTodoBy({
          userId: req.user.id,
          id,
        })
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
  const isAdmin = req.user.id === 999
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
    if (!isAdmin) {
      // Si le user n'est pas admin il ne peut modifier que ses todos
      await TodoListRepository.fetchTodoBy({
        userId: req.user.id,
        id,
      })
    }
    await TodoListRepository.updateTodo(id, todo)
    res.send()
  } catch (error) {
    const status = error instanceof NotFoundException ? 404 : 500
    res.status(status).send(error.message)
  }
}

exports.destroy = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const isAdmin = req.user.id === 999
  try {
    const todo = isAdmin
      ? await TodoListRepository.fetchTodoById(id)
      : await TodoListRepository.fetchTodoBy({
          userId: req.user.id,
          id,
        })
    await TodoListRepository.destroyTodo(todo)
    res.status(200).send()
  } catch (error) {
    const status = error instanceof NotFoundException ? 404 : 500
    res.status(status).send(error.message)
  }
}
