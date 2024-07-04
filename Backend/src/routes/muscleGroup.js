const express = require('express');
const muscleGroupController = require('../controller/muscleGroupController');
const router = express.Router();

router.get('/', muscleGroupController.list);
router.get('/:id', muscleGroupController.getById);

module.exports = router;