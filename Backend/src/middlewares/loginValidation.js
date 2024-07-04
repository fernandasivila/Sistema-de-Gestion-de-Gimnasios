const {body} = require('express-validator');

const loginValidator = [
    body('username').trim().notEmpty().isEmpty('Username is required'),
    body('password').trim().notEmpty().isEmpty('Password is required'),
]

module.exports = loginValidator;