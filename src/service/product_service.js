class productService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(product) {
        const res = await this.productRepository.create(product);
        return res;
    }
    
    async getProductById(id) {
        const res = await this.productRepository.getById(id);
        return res;
        }  
    
    async getAllProducts(filter) {
        const res = await this.productRepository.getAll(filter);
        return res;
    }

    async updateProduct(id, data) {
        const res = await this.productRepository.update(id, data);
        return res; 
    }};

    module.exports = productService;