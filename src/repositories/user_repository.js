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

  async getByMobile(mobile) {
    return await this.model.findOne({ where: { mobile } });
  }
}

module.exports = UserRepository;