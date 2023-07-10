const {usesrsController} = require('../controllers/users.controller')
const {Router} = require('express')

const router = Router()

router.get('/users', usesrsController.getAllUsers)
router.post('/users', usesrsController.registerUser)
router.post('/login', usesrsController.login)

module.exports = router