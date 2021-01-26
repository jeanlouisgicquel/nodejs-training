<script>
  import { Router, Link, Route } from 'svelte-routing'
  import Home from './pages/Home.svelte'
  import Login from './pages/Login.svelte'

  // Used for SSR. A falsy value is ignored by the Router.
  export const url = ''
</script>

<Router {url}>
  <div class="container mx-auto">
    <Route path="login" component={Login} />
    <Route path="/" component={Home} />
  </div>
</Router>
