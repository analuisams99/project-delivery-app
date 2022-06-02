const express = require('express');

const {
  createSale,
  getAllSales, 
  getCostumerSales, getSellerSales, getSale,
  statusUpdateDelivered, statusUpdatePrepare, statusUpdateToDeliver,
} = require('../controllers/SalesController');

const { authorizationGeneral } = require('../middlewares/tokenAuth');
const Validation = require('../middlewares/validations');

const salesRoute = express.Router();

salesRoute.get('/', getAllSales);
salesRoute.post('/', authorizationGeneral, Validation, createSale);
salesRoute.get('/:id', getSale);
salesRoute.get('/costumer/:id', getCostumerSales);
salesRoute.get('/seller/:id', getSellerSales);

salesRoute.patch('/delivered/:id', statusUpdateDelivered);
salesRoute.patch('/prepare/:id', statusUpdatePrepare);
salesRoute.patch('/todeliver/:id', statusUpdateToDeliver);

module.exports = salesRoute;