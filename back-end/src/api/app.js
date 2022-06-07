const express = require('express');
const cors = require('cors');
const path = require('path');
const salesRoute = require('../routers/SalesRoute');

const UsersRouters = require('../routers/usersRoutes');
const { productsRouter } = require('../routers/products');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', '..', 'public', 'images')));

app.use(UsersRouters);
app.use('/sales', salesRoute);
app.use('/products', productsRouter);

module.exports = app;
