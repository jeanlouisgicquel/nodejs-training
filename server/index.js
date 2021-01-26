const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// Routes Http
const todosRouter = require('./routes/todos')
const authRouter = require('./routes/auth')
// Handlers socket.io
const onConnection = (socket) => {
  registerTodosHandlers(io, socket)
}
const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware')
const registerTodosHandlers = require('./handlers/todosHandler')

// middlewares
app.use(cors())
app.use(express.json())

// ajout de socket.io
const http = require('http').Server(app)
http.serveClient = false
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})

// http
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/auth', authRouter)
app.use('/todos', todosRouter)

// socket.io
io.use(socketAuthMiddleware)
io.on('connection', onConnection)

// lancement du serveur
http.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`)
})
