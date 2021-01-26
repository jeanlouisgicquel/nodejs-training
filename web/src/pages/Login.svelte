<script>
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'
  import { loginWithEmailAndPassword } from '../api'

  const form = {
    email: '',
    password: '',
  }
  let error = null
  $: hasError = error !== null && error !== undefined && error.length > 0

  onMount(() => {
    const token = localStorage.getItem('token')
    if (token !== null && token !== undefined) {
      navigate('/', { replace: true })
    }
  })

  async function handleSubmit() {
    try {
      const token = await loginWithEmailAndPassword(form.email, form.password)
      localStorage.setItem('token', token)
      navigate('/', { replace: true })
    } catch (err) {
      error = err.message
    }
  }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email :</label>
    <input
      bind:value={form.email}
      class="border-b"
      type="email"
      name="email"
      required
    />
  </div>
  <div>
    <label for="password">Mot de passe :</label>
    <input
      bind:value={form.password}
      class="border-b"
      type="password"
      name="password"
      required
    />
  </div>
  <div class="mt-2">
    <button class="border p-2 bg-blue-500 text-white" type="submit">
      Connexion
    </button>
  </div>
  {#if hasError}
    <div class="text-red-500">{error}</div>
  {/if}
</form>
