<script>
  import { Link, navigate } from 'svelte-routing'
  import { io } from 'socket.io-client'
  import TodoList from '../components/TodoList.svelte'
  import { onMount, onDestroy } from 'svelte'

  let socket
  let todos = []

  onMount(async () => {
    const token = localStorage.getItem('token')
    if (token === null || token === undefined) {
      navigate('/login', { replace: true })
      return
    }

    socket = io('http://localhost:3000', {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    socket.on('connect', (msg) => {
      console.log('connect', msg)
    })
    socket.on('disconnect', (msg) => {
      console.log('disconnect', msg)
    })
    socket.on('connect_error', (err) => {
      console.log('connect_error', err)
    })
    socket.on('todo:updated', ({ id, todo }) => {
      const todoIdx = todos.findIndex((t) => t.id === id)
      todos = [...todos]
      todos.splice(todoIdx, 1, { ...todo })
    })
    socket.on('todos:fetched', (msg) => {
      todos = msg
    })

    socket.emit('todos:fetch')
  })
  onDestroy(() => socket.disconnect())

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  function updateTodo(event) {
    const todo = event.detail
    socket.emit('todo:update', { id: todo.id, todo })
  }
</script>

<div class="flex relative">
  <Link to="/" class="border p-1">Todo List "classique"</Link>
  <button
    class="absolute top-0 right-0 border bg-blue-500 p-2 text-white"
    on:click={handleLogout}> Déconnexion </button>
</div>

<TodoList {todos} on:updateTodo={updateTodo} />
