const { Sale, SaleProduct, Product, User } = require('../database/models');

const createSales = async (saleData) => {
    const { products, ...data } = saleData;
    const sale = await Sale.create(data);
    await Promise.all(products.map(async ({ productId, quantity }) => SaleProduct.create({
      quantity,
      productId,
      saleId: sale.id,
    })));

    return sale;  
};

const statusChangeDelivered = async (id) => {
  await Sale.update({ status: 'Entregue' }, { where: { id } });
};

const statusChangePrepare = async (id) => {
  await Sale.update({ status: 'Preparando' }, { where: { id } });
};

const statusChangeToDeliver = async (id) => {
  await Sale.update({ status: 'Em trânsito' }, { where: { id } });
};

const listAllSales = async () => {
  const allSales = await Sale.findAll();

  if (!allSales) return null;

  return allSales;
};

const listOneSale = async (id) => {
  console.log('service', id);
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'User', attributes: { exclude: ['id', 'email', 'password', 'role'] } },
      { model: User, as: 'Seller', attributes: { exclude: ['id', 'email', 'password', 'role'] } },
      { model: Product, as: 'Products', through: { attributes: ['quantity'] } },
    ],
  });

  if (!sale) return null;

  return sale;
};

const listCostumerSales = async (id) => {
  const costumerSales = await Sale.findAll({ where: { userId: id } });

  if (!costumerSales) return null;

  return costumerSales;
};

const listSellerSales = async (id) => {
  const sellerSales = await Sale.findAll({ where: { sellerId: id } });

  if (!sellerSales) return null;

  return sellerSales;
};

module.exports = { 
  createSales,
  statusChangeDelivered,
  statusChangePrepare,
  statusChangeToDeliver,
  listAllSales,
  listCostumerSales,
  listSellerSales,
  listOneSale,
};
