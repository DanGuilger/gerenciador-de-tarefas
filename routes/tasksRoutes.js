const express = require('express');
const router = express.Router();

const tasksRepository = require('../repositories/tasksRepository');
const tasksService = require('../services/tasksService');
const tasksController = require('../controllers/tasksController');

const controller = new tasksController(new tasksService(new tasksRepository));

router.get('/projects/:projeto_id/tasks', controller.listarPorProjeto.bind(controller));
router.get('/tasks/new', controller.formCadastro.bind(controller));
router.post('/tasks', controller.cadastrar.bind(controller));
router.get('/tasks/:id', controller.detalhes.bind(controller));
router.get('/tasks/:id/edit', controller.formEdicao.bind(controller));
router.put('/tasks/:id', controller.atualizar.bind(controller));
router.delete('/tasks/:id', controller.deletar.bind(controller));

module.exports = router;