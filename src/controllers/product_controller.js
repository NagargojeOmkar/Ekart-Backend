const BadRequestError = require("../errors/bad_request_error");

function createProduct(req, res) {
  try {
    // some db processing

    return res.json({
      success: true,
      error: {},
      message: 'Successfully created a product',
      data: {
        id: Math.random() * (20),
        title: '',
        description: '',
        category: '',
        price: 0,
        image: ''
      }
    });

  } catch(error) {
    console.log("Something went wrong", error);
  }
}

function productController(req, res, next) {
  try {

    const { title, description, category, price, image } = req.body;

    if (!title) throw new BadRequestError("Product title is required");
    if (!description) throw new BadRequestError("Product description is required");
    if (!category) throw new BadRequestError("Product category is required");
    if (!price) throw new BadRequestError("Product price is required");
    if (!image) throw new BadRequestError("Product image is required");

    return res.json({
      success: true,
      message: "Product created successfully"
    });

  } catch (err) {
    next(err);
  }
}



module.exports = {
    productController
}; 
