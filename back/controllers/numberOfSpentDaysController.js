const {Number_of_spent_days} = require('../models/models')

class NumberOfSpentDaysController{

    async create(req, res){
        const {number_of_spent_days, userId} = req.body
        const num = await Number_of_spent_days.create({number_of_spent_days, userId})
    }

    async getOne(req, res){
        const {userId} = req.body
        const num = await Number_of_spent_days.findOne({where: {userId}})
        res.json(num)
    }

    async delete(req, res){
        const {userId} = req.body
        const sickLeaveRequest = await Number_of_spent_days.destroy({where: {userId: userId}})
        res.json(sickLeaveRequest)
    }

}

module.exports = new NumberOfSpentDaysController()