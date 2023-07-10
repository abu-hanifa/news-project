require ('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

app.use(require('./routes/categories.route'))
app.use(require('./routes/news.route'))
app.use(require('./routes/todos.route'))
app.use(require('./routes/users.route'))



mongoose.connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.listen(process.env.PORT, () => console.log('Connected...'))