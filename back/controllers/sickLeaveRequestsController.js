const {Sick_leave_requests} = require('../models/models')

class SickLeaveRequestsController {
    async getAll(req, res){
        const sickLeaveRequests = await Sick_leave_requests.findAll()
        res.json(sickLeaveRequests)
    }

    async getOne(req, res){
        let {userId} = req.body
        const sickLeaveRequest = await Sick_leave_requests.findOne({where: {userId}})
        res.json(sickLeaveRequest)
    }

    async getReq(req, res){
        let {id} = req.body
        const sickLeaveRequest = await Sick_leave_requests.findOne({where: {id}})
        res.json(sickLeaveRequest)
    }

    async delReq(req, res){
        const {id} = req.body
        const sickLeaveRequest = await Sick_leave_requests.destroy({where: {id: id}})
        res.json(sickLeaveRequest)
    }

    async addRequest(req, res){
        const {number_of_days, message, userId, typesOfSickLeaveId} = req.body
        const sickLeaveRequest = await Sick_leave_requests.create({number_of_days, message, userId, typesOfSickLeaveId})
    }
}

module.exports = new SickLeaveRequestsController()