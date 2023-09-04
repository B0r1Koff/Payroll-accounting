const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const generateJWT = (id, login, role) => {
//     return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
// }

class UserController{
    async registration(req, res){
        const {login, password, role, fio} = req.body
        const user = await User.create({login, password, role, fio}) 
    }

    async isLoginUnique(req, res){
        const {login} = req.body
        const candidate = await User.findOne({where: {login}})
        res.json(candidate)
    }

    async isThereAnyUser(req, res){
        const {login} = req.body
        const user = await User.findOne({where: {login}})
        res.json(user)
    }

    async isPasswordCorrect(req, res){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        // let comparePassword = bcrypt.compareSync(password, user.password)
        let comparePassword = user.password
        if(comparePassword === password){
            return res(true)
        }else return res(false)
    }

    async login(req, res){
        const {login, password} = req.body
        const user = await User.findOne({where: {login, password}})
        // let comparePassword = bcrypt.compareSync(password, user.password)
        // const token = generateJWT(user.id, user.login, user.role)
        // return res.json({token})
        res.json(user)
    }

    async getAll(req, res){
        let users;
        users = await User.findAll()
        res.json(users)
    }

    async getAllAndCount(req, res){
        let users;
        users = await User.findAndCountAll()
        res.json(users)
    }
}

module.exports = new UserController()