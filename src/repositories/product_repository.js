// src/repositories/product_repository.js

const BaseRepository = require('./base_repository');
const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductRepository extends BaseRepository {
  constructor() {
    // 👉 BaseRepository ko model pass kar rahe hai
    super(Product);
  }

  // CREATE PRODUCT
  async createProduct(data) {
    const { price } = data;

    // ✅ Validation (business rule)
    if (price <= 0) {
      throw new Error('Price must be greater than zero');
    }

    return await this.create(data);
  }

  // GET ALL (Pagination + Filter 🔥)
  async getAll(query) {
    let { page = 1, limit = 5, minPrice, maxPrice, categoryId } = query;

    // ✅ SAFE parsing (string → number)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const offset = (page - 1) * limit;

    let where = {};

    // 🎯 Price filter
    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [
          parseInt(minPrice) || 0,
          parseInt(maxPrice) || 999999
        ]
      };
    }

    // 🎯 Category filter
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    // 🔥 Sequelize method (data + count)
    const { count, rows } = await this.model.findAndCountAll({
      where,
      limit,
      offset
    });

    // ✅ Clean response format
    return {
      total: count,
      page,
      limit,
      data: rows
    };
  }
}

module.exports = ProductRepository;