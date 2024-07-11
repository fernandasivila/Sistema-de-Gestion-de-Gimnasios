const express = require('express');
const memberController = require('../controller/memberController');
const upload = require('../middlewares/multer');
const memberValidation = require('../middlewares/memberValidation');
const router = express.Router();

router.get('/', memberController.list);
router.get('/activeMembers', memberController.getActiveMembers);
router.get('/activeMembers/count', memberController.countActiveMembers);
router.get('/:id', memberController.getById);
router.get('/dni/:dni', memberController.getByDni);
router.post('/add', memberValidation, memberController.add);
router.delete('/:id', memberController.delete);
router.put('/edit/:id', memberValidation, memberController.update);

module.exports = router;