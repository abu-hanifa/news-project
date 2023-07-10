const {newsController} = require('../controllers/news.controller')
const {Router} = require('express')

const router = Router()

router.get('/news', newsController.getAllNews)
router.post('/news', newsController.createNews)
router.delete('/news/:id', newsController.deleteNews)
router.get('/news/:id', newsController.getAllCategories)

module.exports = router