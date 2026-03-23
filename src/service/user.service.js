// src/services/user.service.js

const UserRepository = require('../repositories/user_repository');
const BadRequestError = require('../errors/bad_request_error');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    if (!data.email || !data.password) {
      throw new BadRequestError("Email & Password required");
    }

    const existing = await this.userRepository.getByEmail(data.email);

    if (existing) {
      throw new BadRequestError("User already exists");
    }

    return await this.userRepository.create(data);
  }

  async getUser(id) {
    return await this.userRepository.getById(id);
  }
}

module.exports = UserService;