// src/routes/v1/auth_router.js
const express = require('express');
const { register, login, firebaseLogin, getMe } = require('../../controllers/auth_controller');
const authMiddleware = require('../../middleware/auth_middleware');
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/firebase', firebaseLogin);
router.get('/auth/me', authMiddleware, getMe);

module.exports = router;