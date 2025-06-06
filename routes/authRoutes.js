const express = require('express');
const router = express.Router();

const usersRepository = require('../repositories/usersRepository');
const usersService = require('../services/usersService');
const authController = require('../controllers/authController');

const controller = new authController(new usersService(new usersRepository));

router.get('/login', controller.formLogin.bind(controller));
router.post('/login', controller.login.bind(controller));
router.get('/cadastro', controller.formCadastro.bind(controller));
router.post('/cadastro', controller.cadastrar.bind(controller));
router.get('/logout', controller.logout.bind(controller));

module.exports = router;