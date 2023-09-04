const Router = require('express')
const typesOFVacationsController = require('../controllers/typesOFVacationsController')
const router = new Router()

router.post('/getAllTypesOfVacations', typesOFVacationsController.getAll)

module.exports = router