const express = require('express');
const LoginController = require('../controllers/loginController');
const Validation = require('../middlewares/validations');

const router = express.Router();

router.post('/login', Validation, LoginController.login);

module.exports = router;