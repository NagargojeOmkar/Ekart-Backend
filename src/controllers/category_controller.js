const Category = require('../models/category');
const BadRequestError = require('../errors/bad_request_error');


// CREATE
async function create(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new BadRequestError("Title & description required");
    }

    const category = await Category.create({
      title,
      description
    });

    res.status(201).json({ success: true, data: category });

  } catch (err) {
    next(err);
  }
}


// GET ALL
async function getAll(req, res, next) {
  try {
    const data = await Category.findAll();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}


// GET BY ID
async function getById(req, res, next) {
  try {
    const data = await Category.findByPk(req.params.id);
    if (!data) throw new BadRequestError("Not found");

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}


// UPDATE
async function update(req, res, next) {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) throw new BadRequestError("Not found");

    await cat.update(req.body);

    res.json({ success: true, data: cat });

  } catch (err) {
    next(err);
  }
}


// DELETE
async function remove(req, res, next) {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) throw new BadRequestError("Not found");

    await cat.destroy();

    res.json({ success: true, message: "Deleted" });

  } catch (err) {
    next(err);
  }
}


module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
