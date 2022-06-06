const express = require('express');
const UserController = require('../controllers/userController');
const { checkAdmin, authorizationGeneral } = require('../middlewares/tokenAuth');
const Validation = require('../middlewares/validations');

const router = express.Router();

router.post('/login', Validation, UserController.login);
router.post('/users', Validation, UserController.createUser);
router.post('/users/admin', 
  authorizationGeneral, checkAdmin, Validation, UserController.createUserAdmin);

router.get('/users', authorizationGeneral, checkAdmin, UserController.getUsers);
router.get('/users/sellers', authorizationGeneral, UserController.getSellers);
router.delete('/users/:id', authorizationGeneral, checkAdmin, UserController.deleteUser);

module.exports = router;