const BadRequestError = require("../errors/bad_request_error");

function createCategory(req, res) {
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

function CategoryController(req, res, next) {
  try {

    const { title, description, category, price, image } = req.body;

    if (!title) throw new BadRequestError("Category title is required");
    if (!description) throw new BadRequestError("Category description is required");
    if (!category) throw new BadRequestError("category is required");
    if (!price) throw new BadRequestError("Category price is required");
    if (!image) throw new BadRequestError("Category image is required");

    return res.json({
      success: true,
      message: "Category created successfully"
    });

  } catch (err) {
    next(err);
  }
}



module.exports = {
    CategoryController
}; 
