const productsService = require('../services/products');

const getProductsController = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    if (!products) return res.status(404).json({ message: 'Erro ao listar produtos' });

    res.status(200).json(products);
  } catch (error) {
    res.status(404)
      .json({ message: 'Erro ao buscar produtos no banco' });
  }
};

module.exports = {
  getProductsController,
};
