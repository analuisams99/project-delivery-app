const express = require('express');
const salesRoute = require('../routers/SalesRoute');

const app = express();
app.use(express.json());

app.use('/sales', salesRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
