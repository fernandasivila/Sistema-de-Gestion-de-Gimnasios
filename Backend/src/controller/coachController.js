const Coach = require("../database/models/Coach");

const coachController = {
 list: async(req, res) => {
    try{
        const coaches = await Coach.find();
        res.status(200).json({
            "meta": {
            "status": 200,
            "message": 'Coaches retrieved successfully'
            },
            "data": coaches
        });
    }catch (error) {
        res.status(500).json({
        meta: {
            status: 500,
            message: 'Internal Server Error'
        },
        data: {
            error: error.message
        }
        });
    }
 },
 getById: (req, res) => {

 },
 add: (req, res) => {

 },
 edit: (req, res) => {

 },
 delete: (req, res) => {

 },
}

module.exports = coachController;