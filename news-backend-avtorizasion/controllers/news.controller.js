const News = require("../models/News.model")

module.exports.newsController = {
    getAllNews: async (req, res) => {
        const news = await News.find().populate('categories')
        res.json(news)
    },
    getAllCategories: async (req, res) => {
        const news = await News.find({categories: req.params.id})
        res.json(news)
    },

    deleteNews: async (req, res) => {
        try {
             await News.findByIdAndRemove(req.params.id)
            res.json('удалено')
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    },

    createNews: async (req, res) => {
        try {
           const news = await News.create({
                newsHeader: req.body.newsHeader,
                text: req.body.text,
                img: req.body.img,
                categories: req.body.categories
            })
            res.json(news)
            
        } catch (error) {
           res.status(401).json(error.toString()) 
        }
    }
}