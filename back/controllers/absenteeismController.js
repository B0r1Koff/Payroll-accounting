const {Worker_and_absenteeism_number} = require('../models/models')

class AbsenteeismController{
    async create(req, res){
        const {number_of_absenteeism, userId} = req.body
        const absenteeism = await Worker_and_absenteeism_number.create({number_of_absenteeism, userId})
    }

    async getAll(req, res){
        let absenteeism;
        absenteeism = await Worker_and_absenteeism_number.findAndCountAll()
        return res.json(absenteeism)
    }

    async getOne(req, res){
        const {userId} = req.body
        const absenteeism = await Worker_and_absenteeism_number.findOne({where: {userId}})
        res.json(absenteeism)
    }

    async delAbsenteeism(req, res){
        const {userId} = req.body
        const contract = await Worker_and_absenteeism_number.destroy({where: {userId: userId}})
        res.json(contract)
    }
}

module.exports = new AbsenteeismController()