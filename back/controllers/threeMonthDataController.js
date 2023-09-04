const {Three_month_data} = require('../models/models')

class ThreeMonthDataController{
    async create(req, res){
        const {month, salary, userId} = req.body
        const data = await Three_month_data.create({month, salary, userId})
    }

    async getAll(req, res){
        let result;
        result = await Three_month_data.findAll()
        return res.json(result)
    }

    async delData(req, res){
        const {month, userId} = req.body
        const sickLeaveRequest = await Three_month_data.destroy({where: {month: month, userId: userId}})
        res.json(sickLeaveRequest)
    }

    async getOne(req, res){
        const {month, userId} = req.body
        const result = await Three_month_data.findOne({where: {month, userId}})
        res.json(result)
    }
}

module.exports = new ThreeMonthDataController()