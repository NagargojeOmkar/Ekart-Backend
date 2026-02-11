// src/middleware/category_mid.js

function validateCreateCategory(req, res, next) {
  try {
    const { title, description } = req.body;

    // required check
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    // type check
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Title and description must be string"
      });
    }

    // trim check
    if (!title.trim() || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be empty"
      });
    }

    next(); // ✅ pass to controller

  } catch (err) {
    next(err);
  }
}


function validateUpdateCategory(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message: "At least one field required to update"
      });
    }

    next();

  } catch (err) {
    next(err);
  }
}


module.exports = {
  validateCreateCategory,
  validateUpdateCategory
};
