const ProductRepository = require('../repository/product_repository');
class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }   
    async createProduct(title, description, price, categoryId, brandId) {
        return await this.productRepository.createProduct({ title, description, price, categoryId, brandId });
    }
    async getProductById(id) {
        return await this.productRepository.getById(id);
    }
    async getAllProducts(filter) {
        return await this.productRepository.getAll(filter);
    }
    async updateProduct(id, data) {
        return await this.productRepository.update(id, data);
    }   
    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
}

module.exports = ProductService;