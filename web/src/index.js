import App from './App.svelte'
import 'tailwindcss/dist/tailwind.css'

const app = new App({
  target: document.getElementById('app'),
  // hydrate: true,
})

export default app

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.$destroy()
  })
}
