// src/controllers/user_controller.js

const UserService = require('../service/user_service');
const userService = new UserService();

async function create(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  getById,
  getAll
};