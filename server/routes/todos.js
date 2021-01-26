const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const TodoListController = require('../controllers/todolistController')

router.use(authMiddleware)

router.get('/', TodoListController.index)
router.get('/:id', TodoListController.show)
router.post('/', TodoListController.store)
router.put('/:id', TodoListController.update)
router.delete('/:id', TodoListController.destroy)

module.exports = router
