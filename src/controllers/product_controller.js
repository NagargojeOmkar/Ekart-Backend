// src/controllers/product_controller.js

const ProductService = require('../service/product_service');
const productService = new ProductService();

const BadRequestError = require('../errors/bad_request_error');
const NotFoundError = require('../errors/not_found_error');

// CREATE PRODUCT
async function create(req, res, next) {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    // ✅ Validation (undefined check - safe)
    if (
      name === undefined ||
      description === undefined ||
      price === undefined ||
      stock === undefined ||
      categoryId === undefined
    ) {
      throw new BadRequestError('All product fields are required');
    }

    // 👉 Service call (controller direct DB call nahi karega)
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

// GET ALL PRODUCTS (Pagination + Filter)
async function getAll(req, res, next) {
  try {
    // 👉 Query params directly service ko pass
    const result = await productService.getAllProducts(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// GET PRODUCT BY ID
async function getById(req, res, next) {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// UPDATE PRODUCT
async function update(req, res, next) {
  try {
    const { id } = req.params;

    const updatedProduct = await productService.updateProduct(id, req.body);

    if (!updatedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

// DELETE PRODUCT
async function remove(req, res, next) {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(200).json({ message: `Product ${id} deleted successfully` });
  } catch (error) {
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