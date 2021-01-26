const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const todosRouter = require('./routes/todos')
const authRouter = require('./routes/auth')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', authRouter)
app.use('/todos', todosRouter)

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`)
})