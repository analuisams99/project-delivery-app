const express = require('express');
const { getProductsController } = require('../controllers/products');

const { authorizationGeneral } = require('../middlewares/tokenAuth');

const productsRouter = express.Router();

productsRouter.get('/', authorizationGeneral, getProductsController);

module.exports = {
  productsRouter,
};
