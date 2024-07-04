const express = require('express');
const monthlyFeeController = require('../controller/monthlyFeeController');
const monthlyFeeValidation = require('../middlewares/monthlyFeeValidation');
const router = express.Router();

router.get('/', monthlyFeeController.list);
router.get('/:id', monthlyFeeController.getById);
router.post('/add',monthlyFeeValidation, monthlyFeeController.add);
router.delete('/:id', monthlyFeeController.delete);
router.put('/edit/:id',monthlyFeeValidation, monthlyFeeController.update);

module.exports = router;