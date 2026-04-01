// src/routes/v1/user_router.js

const express = require('express');
const { create, getById, getAll} = require('../../controllers/user_controller');

const router = express.Router();

router.post('/users', create);
router.get('/users/:id', getById);

//get all users
router.get('/users', getAll);

module.exports = router;