const {Missing_workers} = require('../models/models')

class MissingWorkersController{
    async create(req, res){
        const {type, date_of_end, userId} = req.body
        const worker = await Missing_workers.create({type, date_of_end, userId})
    }

    async getOne(req, res){
        const {id} = req.body
        const result = await Missing_workers.findOne({where: {id}})
        res.json(result)
    }

    async getAll(req, res){
        let workers;
        workers = await Missing_workers.findAll()
        res.json(workers)
    }

    async delWorker(req, res){
        const {id} = req.body
        const worker = await Missing_workers.destroy({where: {id: id}})
        res.json(worker)
    }
}

module.exports = new MissingWorkersController()