const product = require("../models/product");
const BadRequestError = require('../errors/bad_request_error');
const NotFoundError = require('../errors/not_found_error');

// CREATE
async function create(req, res, next) {
    try {
      const { name, description, price, stock, categoryId } = req.body;
      if ( name === undefined || description === undefined || price === undefined || stock === undefined || categoryId === undefined) {
        throw new BadRequestError('All product fields are required');
      }
      const newProduct = await product.create({ name, description, price, stock, categoryId });
      res.status(201).json(newProduct);
    }
    catch (error) {
      next(error);

    }
} 
// READ
async function getAll(req, res, next) {
    try {
      const products = await product.findAll();
      res.status(200).json(products);
    }
    catch (error) {
      next(error);
    }
}


async function getById(req, res, next) {
    try {
      const { id } = req.params;
      const foundProduct = await product.getById(id);

      if (!foundProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }
      res.status(200).json(foundProduct);
    }
    catch (error) {
      next(error);
    }

}

// UPDATE
async function update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, categoryId } = req.body;
      const updatedProduct = await product.update(id, { name, description, price, stock, categoryId });

      if (!updatedProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
      } 
      res.status(200).json(updatedProduct);
    } 
    catch (error) {
      next(error);
    }
}

// DELETE
async function remove(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await product.remove(id);
      if (!deletedProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
      } 
      res.status(200).json({ message: `Product with id ${id} deleted successfully` });
    } 
    catch (error) {
      next(error);
    } 
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};  

