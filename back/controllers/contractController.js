const {Contract} = require('../models/models')

class ContractController{
    async create(req, res){
        const {date_of_start, date_of_end, salary, number_of_vacation_days, userId} = req.body
        const contract = await Contract.create({date_of_start, date_of_end, salary, number_of_vacation_days, userId})
    }

    async getAll(req, res){
        let contracts;
        contracts = await Contract.findAll()
        res.json(contracts)
    }

    async delContract(req, res){
        const {userId} = req.body
        const contract = await Contract.destroy({where: {userId: userId}})
        res.json(contract)
    }

    async getOne(req, res){
        const {userId} = req.body
        const contract = await Contract.findOne({where: {userId}})
        res.json(contract)
    }
}

module.exports = new ContractController()