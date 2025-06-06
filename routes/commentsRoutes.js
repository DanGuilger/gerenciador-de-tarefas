const express = require('express');
const router = express.Router();

const commentsRepository = require('../repositories/commentsRepository');
const commentsService = require('../services/commentsServices');
const commentsController = require('../controllers/commentsController');

const controller = new commentsController(new commentsService(new commentsRepository));

router.get('/tasks/:tarefa_id/comments', controller.listarPorTarefa.bind(controller));
router.post('/tasks/:tarefa_id/comments', controller.cadastrar.bind(controller));
router.delete('/comments/:id', controller.deletar.bind(controller));

module.exports = router;