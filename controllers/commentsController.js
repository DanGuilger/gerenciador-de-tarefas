class commentsController {
    constructor(service) {
        this.service = service;
    }

    async listarPorTarefa(req, res) {
        try {
            const comments = await this.service.listarPorTarefa(req.params.tarefa_id);
            res.render('comments/lista', { comments, tarefa_id: req.params.tarefa_id });
        } catch (err) {
            console.error('[commentsController] - erro ao listar comentários', err.message);
            res.status(400).send(err.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const comment = {
                ...req.body,
                tarefa_id: req.params.tarefa_id,
                autor_id: req.usuario_id || 1
            };
            await this.service.cadastrar(comment);
            res.redirect(`/tasks/${req.params.tarefa_id}`);
        } catch (err) {
            console.error('[commentsController] - erro na criação do comentário', err.message);
            res.status(400).send(err.message);
        }
    }

    async deletar(req, res) {
        try {
            await this.service.deletar(req.params.id);
            res.redirect('back');
        } catch (err) {
            console.error('[commentsController] - erro ao deletar comentário', err.message);
            res.status(400).send(err.message);
        }
    }
}

module.exports = commentsController;