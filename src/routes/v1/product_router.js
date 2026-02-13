const express = require('express');
const { create, getAll, getById, update, remove } = require('../../controllers/product_controller');

const router = express.Router();

// CREATE
router.post('/products', create);

// GET ALL
router.get('/products', getAll);

// GET BY ID
router.get('/products/:id', getById); 

// UPDATE
router.put('/products/:id', update);

// DELETE 
router.delete('/products/:id', remove);

module.exports = router;