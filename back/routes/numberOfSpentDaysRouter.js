const Router = require('express')
const numberOfSpentDaysController = require('../controllers/numberOfSpentDaysController')
const router = new Router()

router.post('/getOne', numberOfSpentDaysController.getOne)
router.post('/create', numberOfSpentDaysController.create)
router.post('/delete', numberOfSpentDaysController.delete)

module.exports = router