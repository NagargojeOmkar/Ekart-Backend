class BaseRepository {

  constructor(model) {
    this.model = model;
  }

  // CREATE
  async create(data) {
    return await this.model.create(data);
  }

  // GET BY ID
  async getById(id) {
    return await this.model.findByPk(id);
  }

  // GET ALL
  async getAll(filter = {}) {
    return await this.model.findAll({
      where: filter
    });
  }

  // UPDATE
  async update(id, data) {
    await this.model.update(data, {
      where: { id }
    });

    return this.getById(id);
  }

  // DELETE
  async delete(id) {
    return await this.model.destroy({
      where: { id }
    });
  }

}

module.exports = BaseRepository;
