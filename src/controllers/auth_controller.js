// src/controllers/auth_controller.js
const AuthService = require('../service/auth_service');
const authService = new AuthService();

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function firebaseLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    const result = await authService.firebaseLogin(idToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// ── Protected route: returns logged-in user info from JWT ────────────────────
async function getMe(req, res) {
  try {
    const User = require('../models/user');
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'mobile', 'role', 'provider', 'createdAt'],
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { register, login, firebaseLogin, getMe };



// const AuthService = require('../service/auth_service');
// const authService = new AuthService();

// async function register(req, res, next) {
//   try {
//     const user = await authService.register(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     next(err);
//   }
// }

// async function login(req, res, next) {
//   try {
//     const result = await authService.login(req.body);
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports = {
//   register,
//   login
// };