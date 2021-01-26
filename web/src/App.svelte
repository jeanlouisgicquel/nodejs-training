<script>
  import { Router, Route } from 'svelte-routing'
  import Home from './pages/Home.svelte'
  import Login from './pages/Login.svelte'
  import RealtimeTodoList from './pages/RealtimeTodoList.svelte'

  // Used for SSR. A falsy value is ignored by the Router.
  export const url = ''
</script>

<Router {url}>
  <div class="container mx-auto px-2">
    <Route path="login" component={Login} />
    <Route path="/" component={Home} />
    <Route path="/todo-list-realtime" component={RealtimeTodoList} />
  </div>
</Router>
