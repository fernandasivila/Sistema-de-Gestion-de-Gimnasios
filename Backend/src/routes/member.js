const express = require('express');
const memberController = require('../controller/memberController');
const upload = require('../middlewares/multer');
const memberValidation = require('../middlewares/memberValidation');
const router = express.Router();

router.get('/', memberController.list);
router.get('/:id', memberController.getById);
router.post('/add', upload.single('img'), memberValidation, memberController.add);
router.delete('/:id', memberController.delete);
router.put('/edit/:id', upload.single('img'), memberValidation, memberController.update);

module.exports = router;