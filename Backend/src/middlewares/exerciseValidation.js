const {body} = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');
const MuscleGroup = require('../database/models/MuscleGroup');

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const exerciseValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('set').trim().notEmpty().withMessage('Set is required'),
    body('rep').trim().notEmpty().withMessage('Rep is required'),
    body('instruction').trim().notEmpty().withMessage('Instruction is required'),
    body('difficult').trim().notEmpty().toLowerCase().withMessage('Difficult is required').isIn(['principiante', 'intermedio', 'avanzado']).withMessage('Difficulty must be one of principiante, intermedio, avanzado'),
    body('type').trim().notEmpty().withMessage('Type is required').isIn(['funcional', 'muscular']).withMessage('Type must be one of funcional, muscular'),
    body('muscleGroup').trim().notEmpty().withMessage('MuscleGroup is required').custom(isValidObjectId).custom(
        async (value) => {
            const existMuscleGroup = await MuscleGroup.findById(value);
            if (!existMuscleGroup) {
                throw new Error('Muscle group invalid');
            }
            return true;
        }
    ),
    body('images').custom((value, { req }) => {

        if(!req.files || req.files.length === 0) {
          throw new Error('At least one image is required');
        }
  
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        req.files.forEach(file => {
            const fileExtension = path.extname(file.originalname).toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error('Extension is invalid. Available extensions: jpg, jpeg, png.');
            }

            if (file.size > 10 * 1024 * 1024) {
                throw new Error('Image size exceeds limit of 10MB');
            }
        });
        return true;
    })
];

module.exports = exerciseValidation;