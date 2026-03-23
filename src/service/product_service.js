// src/service/product_service.js

const ProductRepository = require('../repositories/product_repository');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // CREATE
  async createProduct(data) {
    // 👉 future me business logic yaha aayega
    return await this.productRepository.createProduct(data);
  }

  // GET BY ID
  async getProductById(id) {
    return await this.productRepository.getById(id);
  }

  // GET ALL (pagination + filter pass)
  async getAllProducts(query) {
    // 👉 optional validation add kar sakte ho
    return await this.productRepository.getAll(query);
  }

  // UPDATE
  async updateProduct(id, data) {
    return await this.productRepository.update(id, data);
  }

  // DELETE
  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

module.exports = ProductService;