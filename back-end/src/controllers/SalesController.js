const {
  createSales,
  statusChangeDelivered, statusChangePrepare, statusChangeToDeliver,
  listAllSales, listOneSale, listCostumerSales, listSellerSales,
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
    const { id } = req.body;
    const sale = await listOneSale(id);
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getCostumerSales = async (req, res, _next) => {
  try {
    const { userId } = req.body;
    const costumerSales = await listCostumerSales(userId);
    return res.status(200).json(costumerSales);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getSellerSales = async (req, res, _next) => {
  try {
    const { sellerId } = req.body;
    const sellerSales = await listSellerSales(sellerId);
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
  getCostumerSales,
  getSellerSales,
  getSale,
};