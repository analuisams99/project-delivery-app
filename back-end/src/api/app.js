const express = require('express');
const { productsRouter } = require('../routers/products');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
