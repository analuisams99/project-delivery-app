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
  await Sale.update({ status: 'Em Trânsito' }, { where: { id } });
};

const listAllSales = async () => {
  const allSales = await Sale.findAll();

  if (!allSales) throw new Error('No sales found');

  return allSales;
};

const listOneSale = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'User', attributes: { exclude: ['id', 'email', 'password', 'role'] } },
      { model: User, as: 'Seller', attributes: { exclude: ['id', 'email', 'password', 'role'] } },
      { model: Product, as: 'Products', through: { attributes: ['quantity'] } },
    ],
  });

  if (!sale) throw new Error('No sale found');

  return sale;
};

const listCustomerSales = async (id) => {
  const customerSales = await Sale.findAll({ where: { userId: id } });

  if (!customerSales) throw new Error('No customer sales found');

  return customerSales;
};

const listSellerSales = async (id) => {
  const sellerSales = await Sale.findAll({ where: { sellerId: id } });

  if (!sellerSales) throw new Error('No seller sales found');

  return sellerSales;
};

module.exports = { 
  createSales,
  statusChangeDelivered,
  statusChangePrepare,
  statusChangeToDeliver,
  listAllSales,
  listCustomerSales,
  listSellerSales,
  listOneSale,
};
