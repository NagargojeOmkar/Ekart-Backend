const CategoryRepository = require('../repositories/category_repository');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

    async createCategory(data) {
        return await this.categoryRepository.create(data);
    }

    async getCategoryById(id) {
        return await this.categoryRepository.getById(id);
    }   

    async getAllCategories(filter) {
        return await this.categoryRepository.getAll(filter);
    }   

    async updateCategory(id, data) {
        return await this.categoryRepository.update(id, data);
    }   

    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }   

}

module.exports = CategoryService;