const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const tasksRepository = require('../repositories/tasksRepository');
const tasksService = require('../services/tasksService');
const tasksController = require('../controllers/tasksController');

const controller = new tasksController(new tasksService(new tasksRepository));

router.get('/projects/:projeto_id/tasks', requireAuth, controller.listarPorProjeto.bind(controller));
router.get('/tasks/new', requireAuth, controller.formCadastro.bind(controller));
router.post('/tasks', requireAuth, controller.cadastrar.bind(controller));
router.get('/tasks/:id', requireAuth, controller.detalhes.bind(controller));
router.get('/tasks/:id/edit', requireAuth, controller.formEdicao.bind(controller));
router.put('/tasks/:id', requireAuth, controller.atualizar.bind(controller));
router.delete('/tasks/:id', requireAuth, controller.deletar.bind(controller));

module.exports = router;