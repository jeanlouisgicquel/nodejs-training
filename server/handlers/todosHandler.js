const TodoListRepository = require('../repositories/todoListRepository')

module.exports = (io, socket) => {
  const fetchTodos = async () => {
    const userId = socket.authUser.id
    const isAdmin = userId === 999
    const todos = isAdmin
      ? await TodoListRepository.fetchTodos()
      : await TodoListRepository.fetchTodosBy({ userId })
    socket.emit('todos:fetched', todos)
  }

  const updateTodo = async ({ id, todo }) => {
    const userId = socket.authUser.id
    const isAdmin = userId === 999
    if (!isAdmin) {
      // Si le user n'est pas admin il ne peut modifier que ses todos
      await TodoListRepository.fetchTodoBy({ userId, id })
    }
    await TodoListRepository.updateTodo(id, todo)
    // l'idéal serait de diffuser le message uniquement à la room du user
    // et non à tous les sockets
    io.emit('todo:updated', { id, todo })
  }

  socket.on('todos:fetch', fetchTodos)
  socket.on('todo:update', updateTodo)
}
