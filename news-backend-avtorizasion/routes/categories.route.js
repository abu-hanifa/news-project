const {categoriesController} = require('../controllers/categories.controller')
const {Router} = require('express')
// const router = require('./news.route')

const router = Router()

router.get('/categories', categoriesController.getAllCategorie)
router.post('/categories', categoriesController.createCategorie)
router.delete('/categories/:id', categoriesController.deleteCategorie)

module.exports = router