const {body} = require('express-validator');
const Exercise = require('../database/models/Exercise');
const MuscleGroup = require('../database/models/MuscleGroup');

const monthlyPlanValidator = [
    body('name').isEmpty('Name is required').isLength({min: 5}).withMessage('Must be at least 5 characters'),
    body('price').isEmpty('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('availableDays').isEmpty('Available Days is required').isInt({ gt: 0 }).withMessage('Available Days must be a positive integer')
]

module.exports = monthlyPlanValidator;