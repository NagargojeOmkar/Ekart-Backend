const BrandService = require('../service/brand_service');
const brandService = new BrandService();

async function create(req, res) {
  try {
    const result = await brandService.createBrand(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  const result = await brandService.getBrand(req.params.id);
  res.json(result);
}

async function getAll(req, res) {
  const result = await brandService.getAllBrands();
  res.json(result);
}

async function update(req, res) {
  const result = await brandService.updateBrand(req.params.id, req.body);
  res.json(result);
}

async function remove(req, res) {
  const result = await brandService.deleteBrand(req.params.id);
  res.json({ deleted: result });
}

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove
};
