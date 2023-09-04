const Router = require('express')
const allowancesController = require('../controllers/allowancesController')
const router = new Router()

router.post('/create', allowancesController.create)
router.post('/getAll', allowancesController.getAll)
router.post('/getUserAllowances', allowancesController.getUserAllowances)

module.exports = router