const express = require('express')
const router = express.Router()

const TodoListController = require('../controllers/todolistController')

router.get('/', TodoListController.index)
router.get('/:id', TodoListController.show)
router.post('/', TodoListController.store)
router.put('/:id', TodoListController.update)
router.delete('/:id', TodoListController.destroy)

module.exports = router
