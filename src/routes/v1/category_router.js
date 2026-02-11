const express = require('express');
const {
  create,
  getAll,
  getById,
  update,
  remove
} = require('../../controllers/category_controller');

const {validateCreateCategory, validateUpdateCategory} = require('../../middleware/category_mid');

const categoryRouter = express.Router();

categoryRouter.post('/',validateCreateCategory, create);
categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getById);
categoryRouter.put('/:id', validateUpdateCategory, update);
categoryRouter.delete('/:id', remove);

module.exports = categoryRouter;
