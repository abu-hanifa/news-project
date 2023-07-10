const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    newsHeader: String,
    text: String,
    img: String,
    categories: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories',
        // required: true
    }
})

const News = mongoose.model('News', newsSchema)
module.exports = News