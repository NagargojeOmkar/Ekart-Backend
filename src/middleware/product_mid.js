// src/middleware/product_mid.js

function validateCreateProduct(req, res, next) {
  try {
    const { name, price, categoryId } = req.body;

    if (!name || price == null || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "name, price, categoryId required"
      });
    }

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: "Name must be string"
      });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        message: "Price must be positive number"
      });
    }

    next();

  } catch (err) {
    next(err);
  }
}


function validateUpdateProduct(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Update body cannot be empty"
    });
  }

  next();
}


module.exports = {
  validateCreateProduct,
  validateUpdateProduct
};
