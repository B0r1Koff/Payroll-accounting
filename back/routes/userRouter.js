const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/uniqueLogin', UserController.isLoginUnique)
router.post('/correctPassword', UserController.isPasswordCorrect)
router.post('/getAllAndCount', UserController.getAllAndCount)
router.post('/getAll', UserController.getAll)

module.exports = router