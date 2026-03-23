// src/repositories/product_repository.js

const BaseRepository = require('./base_repository');
const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  // CREATE
  async createProduct(data) {
    return await this.create(data);
  }

  // GET ALL (Pagination + Filter + Safe Handling 🔥)
  async getAll(query) {

    console.log("REPO RECEIVED QUERY:", query); // 🔥 debug

    // 🧠 CASE 1: Agar service ne already processed query bheji hai
    if (query.where) {
      console.log("USING PRE-BUILT QUERY");

      const { count, rows } = await this.model.findAndCountAll(query);

      return {
        total: count,
        page: 1,
        limit: query.limit || 5,
        data: rows
      };
    }

    // 🧠 CASE 2: Raw query (normal flow)
    let { page = 1, limit = 5, minPrice, maxPrice, categoryId } = query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const offset = (page - 1) * limit;

    let where = {};

    // 🎯 PRICE FILTER (FINAL FIXED 🔥)
    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);

    if (!isNaN(min) || !isNaN(max)) {
      where.price = {};

      if (!isNaN(min)) {
        where.price[Op.gte] = min;
      }

      if (!isNaN(max)) {
        where.price[Op.lte] = max;
      }
    }

    // 🎯 CATEGORY FILTER
    if (categoryId && !isNaN(parseInt(categoryId))) {
      where.categoryId = parseInt(categoryId);
    }

    console.log("FINAL WHERE:", where); // 🔥 debug

    // 🔥 FINAL QUERY
    const { count, rows } = await this.model.findAndCountAll({
      where,
      limit,
      offset
    });

    return {
      total: count,
      page,
      limit,
      data: rows
    };
  }
}

module.exports = ProductRepository;