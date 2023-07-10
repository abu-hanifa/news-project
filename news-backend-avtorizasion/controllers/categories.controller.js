const Categories = require("../models/Categories.model")

module.exports.categoriesController = {
    getAllCategorie: async (req, res) => {
        const categories = await Categories.find()
        res.json(categories)
    },

    deleteCategorie: async (req, res) => {

        try {
           await Categories.findByIdAndRemove(req.params.id)
           res.json('удалено')
           
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    },

    createCategorie: async (req, res) => {
        try {
           const categories = await Categories.create({
                categoriesName: req.body.categoriesName
            })

            return res.json(categories)
            
        } catch (error) {
            return res.status(401).json(error.toString())
        }
    },

    
}