const Router = require('express')
const absenteeismController = require('../controllers/absenteeismController')
const router = new Router()

router.post('/create', absenteeismController.create)
router.get('/getAll', absenteeismController.getAll)
router.post('/getOne', absenteeismController.getOne)
router.post('/delete', absenteeismController.delAbsenteeism)

module.exports = router