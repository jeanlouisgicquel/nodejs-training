<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleUpdateTodo(todo) {
    dispatch('updateTodo', todo)
  }

  $: todosCount = todos.length

  export let todos = []
</script>

<h1>Todo list : ({todosCount} todos)</h1>
<hr />
<ul>
  {#each todos as todo}
    <li class="flex">
      <div>
        #{todo.id} -
      </div>
      <input
        class="flex-grow"
        type="text"
        bind:value={todo.title}
        on:blur={handleUpdateTodo(todo)}
      />
      <input
        type="checkbox"
        bind:checked={todo.completed}
        on:change={handleUpdateTodo(todo)}
      />
    </li>
  {/each}
</ul>
