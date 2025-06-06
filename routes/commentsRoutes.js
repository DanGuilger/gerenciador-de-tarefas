const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const commentsRepository = require('../repositories/commentsRepository');
const commentsService = require('../services/commentsService');
const commentsController = require('../controllers/commentsController');

const controller = new commentsController(new commentsService(new commentsRepository));

router.get('/tasks/:tarefa_id/comments', requireAuth, controller.listarPorTarefa.bind(controller));
router.post('/tasks/:tarefa_id/comments', requireAuth, controller.cadastrar.bind(controller));
router.delete('/comments/:id', requireAuth, controller.deletar.bind(controller));

module.exports = router;