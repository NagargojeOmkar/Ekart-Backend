// src/services/product.service.js

const { Op } = require('sequelize');
const BadRequestError = require('../errors/bad_request_error');
const ProductRepository = require('../repositories/product_repository');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // 🟢 CREATE
  async createProduct(data) {
    if (data.price && isNaN(data.price)) {
      throw new BadRequestError('Price must be a number');
    }

    if (data.price <= 0) {
      throw new BadRequestError('Price must be greater than zero');
    }

    return await this.productRepository.createProduct(data);
  }

  // 🟢 GET BY ID
  async getProductById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError('Invalid product ID');
    }

    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    return product;
  }

  // 🟢 GET ALL (🔥 SEARCH + FILTER + PAGINATION + SORT)
  async getAllProducts(query) {
    const { page, limit } = query;

    // ✅ Pagination validation
    if (!limit || isNaN(limit)) {
      throw new BadRequestError('Limit must be a number');
    }

    if (!page || isNaN(page)) {
      throw new BadRequestError('Page must be a number');
    }

    const parsedLimit = Number(limit);
    const parsedPage = Number(page);

    if (parsedLimit <= 0) {
      throw new BadRequestError('Limit must be greater than 0');
    }

    if (parsedLimit > 50) {
      throw new BadRequestError('Max limit is 50');
    }

    if (parsedPage <= 0) {
      throw new BadRequestError('Page must be greater than 0');
    }

    const offset = (parsedPage - 1) * parsedLimit;

    // 🔵 Sorting
    let order = [];
    if (query.sortBy && query.sortOrder) {
      order.push([query.sortBy, query.sortOrder.toUpperCase()]);
    }

    // 🔵 Filters
    let where = {};

    // 🔍 SEARCH (NEW 🔥)
    if (query.search) {
      if (typeof query.search !== "string") {
        throw new BadRequestError('search must be a string');
      }

      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${query.search}%`
          }
        },
        {
          description: {
            [Op.like]: `%${query.search}%`
          }
        }
      ];
    }

    // 💰 PRICE FILTER
    if (query.minPrice || query.maxPrice) {
      where.price = {};

      if (query.minPrice) {
        if (isNaN(query.minPrice)) {
          throw new BadRequestError('minPrice must be a number');
        }
        where.price[Op.gte] = Number(query.minPrice);
      }

      if (query.maxPrice) {
        if (isNaN(query.maxPrice)) {
          throw new BadRequestError('maxPrice must be a number');
        }
        where.price[Op.lte] = Number(query.maxPrice);
      }

      // ✅ Range validation
      if (
        query.minPrice &&
        query.maxPrice &&
        Number(query.minPrice) > Number(query.maxPrice)
      ) {
        throw new BadRequestError('minPrice cannot be greater than maxPrice');
      }
    }

    // 📦 CATEGORY FILTER
    if (query.categoryId) {
      if (isNaN(query.categoryId)) {
        throw new BadRequestError('categoryId must be a number');
      }
      where.categoryId = Number(query.categoryId);
    }

    // 📦 STOCK FILTER (optional)
    if (query.inStock) {
      if (!['true', 'false'].includes(query.inStock.toLowerCase())) {
        throw new BadRequestError('inStock must be true or false');
      }
      where.inStock = query.inStock === 'true';
    }

    // 🚀 FINAL CALL TO REPO
    return await this.productRepository.getAll({
      where,
      limit: parsedLimit,
      offset,
      order
    });
  }

  // 🟢 UPDATE
  async updateProduct(id, data) {
    if (!id || isNaN(id)) {
      throw new BadRequestError('Invalid product ID');
    }

    return await this.productRepository.update(id, data);
  }

  // 🟢 DELETE
  async deleteProduct(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError('Invalid product ID');
    }

    return await this.productRepository.delete(id);
  }
}

module.exports = ProductService;