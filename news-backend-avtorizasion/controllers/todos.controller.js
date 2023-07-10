const Todo = require("../models/Todo.model")
const jwt = require("jsonwebtoken")

module.exports.todosController = {
    getAllTodos: async (req, res) => {
        const todos = await Todo.find()

        res.json(todos)
    },

    getNewsComments: async (req, res) => {
        const comments = await Todo.find({newsId: req.params.id}).populate('user')
        res.json(comments)
    },

    deleteTodo: async (req, res) => {
        const {id} = req.params

        try {
            
              const data =  await Todo.findByIdAndRemove(id)
            res.json(data)
        } catch (error) {
            return res.status(401).json({error: "ошибка" + error.toString()})
        }
    },

    

     createTodo: async (req, res) => {
        const {text} = req.body

        try {
            const todo = await Todo.create({
                user: req.user.id,
                text: text,
                newsId: req.params.id
            })
            return res.json(todo)
            
        } catch (error) {
            return res.status(401).json(error.toString())
        }
     }
}