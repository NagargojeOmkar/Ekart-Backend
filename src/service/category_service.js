class CategoryService {
    constructor(CategoryService) {
        this.CategoryService = CategoryService;
    }

    async createCategory(product) {
        const res = await this.CategoryService.create(product);
        return res;
    }
    
    async getCategoryById(id) {
        const res = await this.CategoryService.getById(id);
        return res;
        }  
    
    async getAllCategory(filter) {
        const res = await this.CategoryService.getAll(filter);
        return res;
    }

    async updateCategory(id, data) {
        const res = await this.CategoryService.update(id, data);
        return res; 
    }};

    module.exports = CategoryService;