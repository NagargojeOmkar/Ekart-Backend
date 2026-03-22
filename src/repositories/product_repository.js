const BaseRepository = require('./base_repository');
const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async createProduct(data) {
    const { name, description, price, categoryId, brandId } = data;

    if (price <= 0) {
      throw new Error('Price must be greater than zero');
    }

    return await this.create({
      name,
      description,
      price,
      categoryId,
      brandId
    });
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

