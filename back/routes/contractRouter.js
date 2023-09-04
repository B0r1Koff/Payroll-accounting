const Router = require('express')
const contractController = require('../controllers/contractController')
const router = new Router()

router.post('/create', contractController.create)
router.post('/getAll', contractController.getAll)
router.post('/getOne', contractController.getOne)
router.post('/delContract', contractController.delContract)

module.exports = router