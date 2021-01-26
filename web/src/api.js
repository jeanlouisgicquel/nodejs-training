const API_URL = 'http://localhost:3000/'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

function handleErrorsResponse(response) {
  if (response.status === 401) {
    throw new Error('Mauvais identifiant')
  }
  if (response.status !== 200) {
    throw new Error('Une erreur est survenue')
  }
}

async function loginWithEmailAndPassword(email, password) {
  const response = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      email,
      password,
    }),
  })
  handleErrorsResponse(response)
  return (await response.json()).accessToken
}

async function getTodos() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}todos`, {
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
    },
  })
  handleErrorsResponse(response)
  return await response.json()
}

async function updateTodo(todo) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  })
  handleErrorsResponse(response)
  return
}

export { loginWithEmailAndPassword, getTodos, updateTodo }
