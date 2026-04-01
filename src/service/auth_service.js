// src/service/auth_service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const admin = require('../config/firebase');

class AuthService {

  _generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
  }

  async register({ name, email, password, mobile }) {
    if (!email || !password) throw new Error('Email and password are required');
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('Email already registered');
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, mobile: mobile || null, provider: 'local' });
    const token = this._generateToken(user);
    return { success: true, message: 'Registered successfully', token, user: { id: user.id, name: user.name, email: user.email, role: user.role, provider: user.provider } };
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error('Email and password are required');
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    if (user.provider !== 'local') throw new Error(`This account uses ${user.provider} login. Please use that instead.`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    const token = this._generateToken(user);
    return { success: true, message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, role: user.role, provider: user.provider } };
  }

  async firebaseLogin(idToken) {
    if (!idToken) throw new Error('Firebase ID token is required');
    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      throw new Error('Invalid or expired Firebase token');
    }
    const { email, name, firebase } = decoded;
    const signInProvider = firebase?.sign_in_provider;
    const provider = signInProvider === 'google.com' ? 'google' : 'firebase';
    if (!email) throw new Error('No email found in Google account');
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name: name || email.split('@')[0], email, password: null, mobile: null, provider });
    } else if (user.provider === 'local') {
      user.provider = provider;
      await user.save();
    }
    const token = this._generateToken(user);
    return { success: true, message: 'Google login successful', token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, role: user.role, provider: user.provider } };
  }
}

module.exports = AuthService;


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserRepository = require('../repositories/user_repository');
// const BadRequestError = require('../errors/bad_request_error');

// class AuthService {
//   constructor() {
//     this.userRepository = new UserRepository();
//   }

//   // 🔐 REGISTER
//   async register(data) {
//     const { name, email, password } = data;

//     if (!email || !password) {
//       throw new BadRequestError("Email & password required");
//     }

//     const existing = await this.userRepository.getByEmail(email);
//     if (existing) {
//       throw new BadRequestError("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await this.userRepository.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     return user;
//   }

//   // 🔐 LOGIN
//   async login(data) {
//     const { email, password } = data;

//     const user = await this.userRepository.getByEmail(email);
//     if (!user) {
//       throw new BadRequestError("User not found");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new BadRequestError("Invalid credentials");
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       "SECRET_KEY",
//       { expiresIn: "1d" }
//     );

//     return { user, token };
//   }
// }

// module.exports = AuthService;