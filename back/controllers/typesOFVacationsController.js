const {Types_of_vacation} = require('../models/models')

class typesOfVacationsController{
    async getAll(req, res){
        const typesOfVacations = await Types_of_vacation.findAll()
        res.json(typesOfVacations)
    }
}

module.exports = new typesOfVacationsController()