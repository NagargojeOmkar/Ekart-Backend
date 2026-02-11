const BaseRepository = require('./base_repository');
const Brand = require('../models/brand');

class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand);
  }

  async getByName(name) {
    return await Brand.findOne({ where: { name }});
  }
}

module.exports = BrandRepository;
