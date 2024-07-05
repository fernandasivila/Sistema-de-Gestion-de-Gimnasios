const express = require('express');
const exerciseController = require('../controller/exerciseController');
const upload = require('../middlewares/multer');
const exerciseValidation = require('../middlewares/exerciseValidation');
const router = express.Router();

router.get('/', exerciseController.list);
router.get('/:id', exerciseController.getById);
router.post('/add', upload.array('img', 10), exerciseValidation, exerciseController.add);
router.delete('/:id', exerciseController.delete);
router.put('/edit/:id', upload.array('img', 10), exerciseValidation, exerciseController.update);

module.exports = router;

