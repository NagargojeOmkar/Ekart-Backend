// // src/routes/v1/product_router.js

const express = require('express');
const { getAll, getById, create, update, remove } = require('../../controllers/product_controller');
const router = express.Router();
const authMiddleware = require('../../middleware/auth_middleware');
const { isAdmin } = require('../../middleware/role_middleware');


router.get('/products', getAll);
router.get('/products/:id', getById);

router.post('/products', authMiddleware, isAdmin, create);
router.put('/products/:id', authMiddleware, isAdmin, update);
router.delete('/products/:id', authMiddleware, isAdmin, remove);

// // CREATE
// router.post('/products', create);

// // GET ALL
// router.get('/products', getAll);

// // GET BY ID
// router.get('/products/:id', getById); 

// // UPDATE
// router.put('/products/:id', update);

// // DELETE 
// router.delete('/products/:id', remove);



module.exports = router;