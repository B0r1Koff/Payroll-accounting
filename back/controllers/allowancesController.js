const {Allowances} = require('../models/models')

class AllowancesController{
    async create(req, res){
        const {by_contract, additional, userId} = req.body
        const allowances = await Allowances.create({by_contract, additional, userId})
    }

    async getAll(req, res){
        let allowances;
        allowances = await Allowances.findAndCountAll()
        return res.json(allowances)
    }

    async getUserAllowances(req, res){
        const {userId} = req.body
        const allowances = await Allowances.findOne({where: {userId}})
        res.json(allowances)
    }
}

module.exports = new AllowancesController()