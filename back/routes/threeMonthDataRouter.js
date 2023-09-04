const Router = require('express')
const threeMonthDataController = require('../controllers/threeMonthDataController')
const router = new Router()

router.post('/create', threeMonthDataController.create)
router.post('/getAll', threeMonthDataController.getAll)
router.post('/getOne', threeMonthDataController.getOne)
router.post('/delData', threeMonthDataController.delData)

module.exports = router