<script>
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'
  import * as Api from '../api'
  import TodoList from '../components/TodoList.svelte'

  let todos = []
  let todosInit = []
  let error = null
  $: hasError = error !== null && error !== undefined && error.length > 0

  onMount(async () => {
    const token = localStorage.getItem('token')
    if (token === null || token === undefined) {
      navigate('/login', { replace: true })
    }

    todos = await Api.getTodos()
    todosInit = todos.map((t) => ({ ...t }))
  })

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  async function updateTodo(event) {
    const todo = event.detail
    try {
      await Api.updateTodo(todo)
      todos = await Api.getTodos()
      error = null
    } catch (err) {
      error = err.message
      todos = todosInit.map((t) => ({ ...t }))
    }
  }
</script>

<div class="relative h-32 w-32">
  <button
    class="absolute top-0 right-0 border bg-blue-500 p-2 text-white"
    on:click={handleLogout}> Déconnexion </button>
</div>

{#if hasError}
  <div class="text-red-500">{error}</div>
{/if}
<TodoList {todos} on:updateTodo={updateTodo} />
