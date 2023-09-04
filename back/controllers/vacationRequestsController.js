const {Vacation_requests} = require('../models/models')

class VacationsRequestsController {
    async getAll(req, res){
        const vacationRequests = await Vacation_requests.findAll()
        return res.json(vacationRequests)
    }

    async getOne(req, res){
        let {userId} = req.body
        // try{
        //     const vacationRequest = await Vacation_requests.findOne({where: {userId}})
        //     res.json(vacationRequest)
        // }
        // catch(e){res.json(e)}
        const vacationRequest = await Vacation_requests.findOne({where: {userId}})
        res.json(vacationRequest)
    }

    async getReq(req, res){
        let {id} = req.body
        const vacationRequest = await Vacation_requests.findOne({where: {id}})
        res.json(vacationRequest)
    }

    async delReq(req, res){
        const {id} = req.body
        const sickLeaveRequest = await Vacation_requests.destroy({where: {id: id}})
        res.json(sickLeaveRequest)
    }

    async addRequest(req, res){
        const {number_of_days, message, date_of_start, userId, typesOfVacationId} = req.body
        const vacationRequest = await Vacation_requests.create({number_of_days, message, date_of_start, userId, typesOfVacationId})
    }
}

module.exports = new VacationsRequestsController()