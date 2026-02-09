const BaseRepository = require("./base_repository");
const { Category } = require("../models");

class CategoryRepository extends BaseRepository {

  constructor() {
    super(Category);  
  }

  // custom method
  async getByName(name) {
    return await Category.findOne({
      where: { name }
    });
  }

}

module.exports = CategoryRepository;
