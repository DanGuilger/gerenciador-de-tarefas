const commentsService = require("../services/commentsService");

module.exports = {
  async create(req, res) {
    try {
      console.log('Dados recebidos:', req.body); // Para debug
      const comment = await commentsService.create(req.body);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const comments = await commentsService.list();
      res.json(comments);
    } catch (error) {
      console.error('Erro ao listar comentários:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async detail(req, res) {
    try {
      const { id } = req.params;
      const comment = await commentsService.detail(id);
      
      if (!comment) {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }
      
      res.json(comment);
    } catch (error) {
      console.error('Erro ao buscar comentário:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async findByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const comments = await commentsService.findByTaskId(taskId);
      res.json(comments);
    } catch (error) {
      console.error('Erro ao buscar comentários por tarefa:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const comment = await commentsService.update(id, req.body);
      res.json(comment);
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await commentsService.remove(id);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao remover comentário:', error);
      res.status(400).json({ error: error.message });
    }
  },
};