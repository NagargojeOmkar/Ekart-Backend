// src/middleware/category_mid.js

const ValidationError = require('../errors/validation_error');

function validateCreateCategory(req, res, next) {
  try {
    const { title, description } = req.body;

    // required check
    console.log(req.body);
    if (!req.body.title || !req.body.description) {
      return next(new ValidationError([
        { field: "title", message: "Title is required" },
        { field: "description", message: "Description is required" }
      ]));
      next();
    }

    // type check
    if (typeof title !== 'string' || typeof description !== 'string') {
      return next(new ValidationError([
        { field: "title", message: "Title must be a string" },
        { field: "description", message: "Description must be a string" }
      ]));
    }

    // trim check
    if (!title.trim() || !description.trim()) {
      return next(new ValidationError([
        { field: "title", message: "Title cannot be empty" },
        { field: "description", message: "Description cannot be empty" }
      ]));
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
      return next(new ValidationError([
        { field: "title", message: "Title is required" },
        { field: "description", message: "Description is required" }
      ]));
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
