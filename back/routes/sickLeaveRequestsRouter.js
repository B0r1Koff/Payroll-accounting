const Router = require('express')
const sickLeaveRequestsConteroller = require('../controllers/sickLeaveRequestsController')
const router = new Router()

router.post('/createSickLeaveRequest', sickLeaveRequestsConteroller.addRequest)
router.post('/getAllSickLeaveRequests', sickLeaveRequestsConteroller.getAll)
router.post('/find', sickLeaveRequestsConteroller.getOne)
router.post('/getReq', sickLeaveRequestsConteroller.getReq)
router.post('/delReq', sickLeaveRequestsConteroller.delReq)

module.exports = router