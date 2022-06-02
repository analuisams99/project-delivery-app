const express = require('express');
const salesRoute = require('../routers/SalesRoute');

const app = express();
app.use(express.json());

app.use('/sales', salesRoute);

module.exports = app;
