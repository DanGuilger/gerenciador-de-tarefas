const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const projectsRepository = require('../repositories/projectsRepository');
const projectsService = require('../services/projectsService');
const projectsController = require('../controllers/projectsController');

const controller = new projectsController(new projectsService(new projectsRepository));

router.get('/projects', requireAuth, controller.listar.bind(controller));
router.get('/projects/new', requireAuth, controller.formCadastro.bind(controller));
router.post('/projects', requireAuth, controller.cadastrar.bind(controller));
router.get('/projects/:id', requireAuth, controller.detalhes.bind(controller));
router.get('/projects/:id/edit', requireAuth, controller.formEdicao.bind(controller));
router.put('/projects/:id', requireAuth, controller.atualizar.bind(controller));
router.delete('/projects/:id', requireAuth, controller.deletar.bind(controller));

module.exports = router;