const BrandRepository = require('../repositories/brand_repository');

class BrandService {
  constructor() {
    this.brandRepository = new BrandRepository();
  }

  async createBrand(data) {
    return await this.brandRepository.create(data);
  }

  async getBrand(id) {
    return await this.brandRepository.getById(id);
  }

  async getAllBrands() {
    return await this.brandRepository.getAll();
  }

  async updateBrand(id, data) {
    return await this.brandRepository.update(id, data);
  }

  async deleteBrand(id) {
    return await this.brandRepository.delete(id);
  }
}

module.exports = BrandService;
