const express = require('express');
const router = express.Router();

const projectsRepository = require('../repositories/projectsRepository');
const projectsService = require('../services/projectsService');
const projectsController = require('../controllers/projectsController');

const controller = new projectsController(new projectsService(new projectsRepository));

router.get('/projects', controller.listar.bind(controller));
router.get('/projects/new', controller.formCadastro.bind(controller));
router.post('/projects', controller.cadastrar.bind(controller));
router.get('/projects/:id', controller.detalhes.bind(controller));
router.get('/projects/:id/edit', controller.formEdicao.bind(controller));
router.put('/projects/:id', controller.atualizar.bind(controller));
router.delete('/projects/:id', controller.deletar.bind(controller));

module.exports = router;