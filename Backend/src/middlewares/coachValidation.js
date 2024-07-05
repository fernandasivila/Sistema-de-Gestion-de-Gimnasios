const {body} = require('express-validator');
const path = require('path');

const coachValidator = [
    body('fullname').trim().notEmpty().withMessage('Fullname is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('workArea').trim().notEmpty().withMessage('WorkArea is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('age').trim().notEmpty().withMessage('Age is required'),
    body('schedule').trim().notEmpty().withMessage('Schedule is required'),
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

module.exports = coachValidator;