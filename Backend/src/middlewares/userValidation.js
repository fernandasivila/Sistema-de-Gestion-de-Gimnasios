const {body} = require('express-validator');
const User = require('../database/models/User');
const Role = require('../database/models/Role');

const userValidation = [
    body('username').trim().notEmpty().withMessage('Username is required.').isLength({min: 5}).withMessage('Must be at least 5 characters').bail()
    .custom(async (value)=> {
        const existUsername = await User.find({username : value.trim()});

        if(existUsername){
            throw new Error('Username already in use');
        }
        return true;
    }),
    body('password').trim().notEmpty().withMessage('Password is required.').bail().isLength({ min: 8 }).withMessage('Min length 8 characters').bail().matches(/[A-Z]/).withMessage('Must be at least a uppercase').bail().matches(/[a-z]/).withMessage('Must be at least a lowercase').bail().matches(/[0-9]/).withMessage('Must be at least a number'),
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email invalid').bail()
    .custom(async (value) => {
        const existEmail = await User.find({ email: value });
      if (existEmail) {
      throw new Error('Email already in use');
      }
      return true;
  }),
    body('role').trim().notEmpty().withMessage('Role is required').bail()
    .custom(async (value) => {
        const existRole = await Role.find({ _id: value });
        if (!existRole) {
        throw new Error('Role invalid');
        }
        return true;
    }),
    body('personalInformation.firstName').trim().notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Debe tener minimo 3 caracteres'),
    body('personalInformation.lastName').trim().notEmpty().withMessage('Surname is required').isLength({ min: 3 }).withMessage('Debe tener minimo 3 caracteres'),
    body('personalInformation.dni').trim().notEmpty().withMessage('DNI is required').bail()
    .custom(async (value) => {
        const existDNI = await User.find({dni : value});

        if (existDNI) {
        throw new Error('DNI already in use');
        }
        return true;
    }),
    body('personalInformation.address').trim().notEmpty().withMessage('Address is required'),
    body('personalInformation.phone').trim().notEmpty().withMessage('Phone is required'),
    body('personalInformation.dateOfBirth').trim().notEmpty().withMessage('Date of Birth is required'),
    body('img').custom((value, { req }) => {

      if(!req.file){
        return true;
      }

      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = path.extname(req.file.originalname);

      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
          throw new Error('Extension is invalid.Availables: jpg, jpeg, png.');
      }
        return true;
      }),   
]
