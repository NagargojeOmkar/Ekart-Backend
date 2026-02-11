const express = require('express');
const brandController = require('../../controllers/brand_controller');


const router = express.Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);
router.put('/:id', brandController.update);
router.delete('/:id', brandController.remove);

module.exports = router;
