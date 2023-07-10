const {todosController} = require('../controllers/todos.controller')
const {Router} = require('express')
const authMiddleware = require('../models/middlewares/auth.middleware')
// const router = require('./users.route')

const router = Router()

router.get('/todos', todosController.getAllTodos)
router.get('/todos/:id', todosController.getNewsComments)
router.post('/todos/:id', authMiddleware, todosController.createTodo)
router.delete('/todos/:id', authMiddleware, todosController.deleteTodo)


module.exports = router