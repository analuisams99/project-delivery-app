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
  await Sale.update({ where: { id } }, { status: 'Entregue' });
};

const statusChangePrepare = async (id) => {
  await Sale.update({ where: { id } }, { status: 'Preparando' });
};

const statusChangeToDeliver = async (id) => {
  await Sale.update({ where: { id } }, { status: 'Em Trânsito' });
};

const listAllSales = async () => {
  const allSales = await Sale.findAll();

  if (!allSales) return null;

  return allSales;
};

const listOneSale = async (id) => {
  console.log('service', id);
  const sale = await Sale.findAll({
    where: { id },
    include: [{ model: User, as: 'users', through: { attributes: [] } }],
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
