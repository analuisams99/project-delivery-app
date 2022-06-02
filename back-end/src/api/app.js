const express = require('express');

const UsersRouters = require('../routers/usersRoutes');

const { productsRouter } = require('../routers/products');


const app = express();
app.use(express.json());

app.use(UsersRouters);
app.use('/products', productsRouter);

module.exports = app;
