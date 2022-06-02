const { Product } = require('../database/models');

const getProducts = async () => {
  const products = await Product.findAll();
  if (!products) return null;
  return products;
};

module.exports = {
  getProducts,
};
