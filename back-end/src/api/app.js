const express = require('express');
const UsersRouters = require('../routers/usersRoutes');

const app = express();
app.use(express.json());

app.use(UsersRouters);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
