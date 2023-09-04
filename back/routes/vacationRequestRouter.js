const Router = require('express')
const vacationsRequestsController = require('../controllers/vacationRequestsController')
const router = new Router()

router.post('/createVacationRequest', vacationsRequestsController.addRequest)
router.post('/getAllVacationRequests', vacationsRequestsController.getAll)
router.post('/find', vacationsRequestsController.getOne)
router.post('/getReq', vacationsRequestsController.getReq)
router.post('/delReq', vacationsRequestsController.delReq)

module.exports = router