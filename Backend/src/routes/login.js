const express = require('express');
const loginValidator = require('../middlewares/loginValidation');
const router = express.Router();

router.get('/', loginValidator, userController.list);

module.exports = router;