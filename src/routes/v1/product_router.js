  const express = require('express');
  const { getAll, getById, create, update, remove } = require('../../controllers/product_controller');
  const router = express.Router();
  const authMiddleware = require('../../middleware/auth_middleware');
  const { isAdmin } = require('../../middleware/role_middleware');


  router.get('/', getAll);
  router.get('/:id', getById);

  router.post('/', authMiddleware, isAdmin, create);
  router.put('/:id', authMiddleware, isAdmin, update);
  router.delete('/:id', authMiddleware, isAdmin, remove);



  module.exports = router;