const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    categoriesName: String
})
const Categories = mongoose.model('Categories', categoriesSchema)
module.exports = Categories
