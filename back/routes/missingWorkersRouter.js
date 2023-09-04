const Router = require('express')
const missingWorkersController = require('../controllers/missingWorkersController')
const router = new Router()

router.post('/create', missingWorkersController.create)
router.post('/getOne', missingWorkersController.getOne)
router.post('/getAll', missingWorkersController.getAll)
router.post('/delWorker', missingWorkersController.delWorker)

module.exports = router