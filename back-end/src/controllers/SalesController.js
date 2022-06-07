const {
  createSales,
  statusChangeDelivered, statusChangePrepare, statusChangeToDeliver,
  listAllSales, listOneSale, listCustomerSales, listSellerSales,
} = require('../services/SalesService');

const SUCCESSFULLY_MESSAGE = 'Successfully updated';
const createSale = async (req, res, _next) => {
  try {
    const sales = await createSales(req.body);
    return res.status(201).json(sales);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const statusUpdateDelivered = async (req, res, _next) => {
  try {
    const { id } = req.params;
    await statusChangeDelivered(id);
    return res.status(200).json({ message: SUCCESSFULLY_MESSAGE });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const statusUpdatePrepare = async (req, res, _next) => {
  try {
    const { id } = req.params;
    await statusChangePrepare(id);
    return res.status(200).json({ message: SUCCESSFULLY_MESSAGE });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const statusUpdateToDeliver = async (req, res, _next) => {
  try {
    const { id } = req.params;
    await statusChangeToDeliver(id);
    return res.status(200).json({ message: SUCCESSFULLY_MESSAGE });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllSales = async (req, res, _next) => {
  try {
    const allSales = await listAllSales();
    return res.status(200).json(allSales);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getSale = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await listOneSale(id);
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getCustomerSales = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const customerSales = await listCustomerSales(id);
    return res.status(200).json(customerSales);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getSellerSales = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sellerSales = await listSellerSales(id);
    return res.status(200).json(sellerSales);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { 
  createSale,
  statusUpdateDelivered,
  statusUpdatePrepare,
  statusUpdateToDeliver,
  getAllSales,
  getCustomerSales,
  getSellerSales,
  getSale,
};