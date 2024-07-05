const {body} = require('express-validator');
const path = require('path');
const Member = require('../database/models/Member');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const memberValidation = [
    body('state').trim().notEmpty().withMessage('State is required'),
    body('routines').isArray({min: 1}).withMessage('At least one routine is required')
    .custom(routines => routines.every(isValidObjectId)).withMessage('Invalid routine ID'),
    body('progress').isArray({min: 1}).withMessage('At least one routine is required')
    .custom(progress => progress.every(isValidObjectId)).withMessage('Invalid progress ID'),
    body('mounthlyPlan').trim().notEmpty().withMessage('Mounthly plan is required').custom(isValidObjectId).withMessage('Invalid monthly plan ID'),
    body('img').custom((value, { req }) => {

        if(!req.file){
          throw new Error('Image is required');
        }
  
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
  
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Extension is invalid. Available extensions: jpg, jpeg, png.');
        }
  
        if(req.file.size > 10 * 1024 * 1024){
          throw new Error('Image size exceeds limit of 10MB'); 
        }
          return true;
        })
]

module.exports = memberValidation;