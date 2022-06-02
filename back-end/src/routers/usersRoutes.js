const express = require('express');
const LoginController = require('../controllers/userController');
const { checkAdmin } = require('../middlewares/tokenAuth');
const Validation = require('../middlewares/validations');

const router = express.Router();

router.post('/login', Validation, LoginController.login);
router.post('/users', Validation, LoginController.createUser);

router.get('/users', checkAdmin, LoginController.getUsers);

module.exports = router;