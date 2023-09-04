const Router = require('express')
const router = new Router()
const typesOfSickLeaveController = require('../controllers/typesOfSickLeaveController')

router.post('/getAllTypesOfSickLeave', typesOfSickLeaveController.getAll)

module.exports = router