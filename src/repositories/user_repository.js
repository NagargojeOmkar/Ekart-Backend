// src/repositories/user_repository.js

const BaseRepository = require('./base_repository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async getByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }
}

module.exports = UserRepository;