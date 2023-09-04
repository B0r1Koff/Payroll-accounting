const {Types_of_sick_leave} = require('../models/models')

class typesOfSickLeaveController{
    async getAll(req, res){
        const typesOfSickLeave = await Types_of_sick_leave.findAll()
        res.json(typesOfSickLeave)
    }
}

module.exports = new typesOfSickLeaveController()