const {json} = require("express")
const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.usesrsController = {
    getAllUsers: async (req, res) => {
        const users = await User.find()
        res.json(users)
    },

    registerUser: async (req, res) => {
        const {login, password} = req.body
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUND))
        const candidate = await User.findOne({login: login})
        if(candidate){
            return res.status(401).json({error: 'такой уже есть'})
        }
        const user = await User.create({login: login, password: hash})

        
        res.json(user)
    },

    login: async (req, res) => {
        try {
            const {login, password} = req.body

            const candidate = await User.findOne({login: login})
            if(!candidate){
                return res.status(401).json({error: 'неверный логин'})
            }
            const valid = await bcrypt.compare(password, candidate.password)
            if(!valid){
                return res.status(401).json({error: 'неверный пароль'})
            }

            const payload = {
                id: candidate._id,
                login: candidate.login
            }

            const token = await jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "24h"
            })
            res.json({token})
            
        } catch (error) {
            res.json(error.message)
        }
    }
}