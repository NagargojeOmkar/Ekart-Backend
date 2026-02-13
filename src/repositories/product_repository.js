const BaseRepository = require('./base_repository');
const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async getByPriceRange(min, max) {
    return await Product.findAll({
      where: {
        price: {
          [Op.between]: [min, max]
        }
      }
    });
  }
}

