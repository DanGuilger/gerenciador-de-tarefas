class tasksController {
    constructor(service) {
        this.service = service;
    }

    formCadastro(req, res) {
        res.render('cadastro'); 
    }

    async cadastrar(req, res) {
        try {
            await this.service.cadastrar(req.body);
            res.redirect('/tasks');
        } catch (err) {
            console.error('[tasksController] - erro na criação da tarefa', err.message);
            res.status(400).send(err.message);
        }
    }
    
    async listarPorProjeto(req, res) {
        try {
            const tasks = await this.service.listarPorProjeto(req.params.projeto_id);
            res.render('tasks/lista', { tasks });
        } catch (err) {
            console.error('[tasksController] - erro ao listar tarefas', err.message);
            res.status(400).send(err.message);
        }
    }

    async detalhes(req, res) {
        try {
            const task = await this.service.buscarPorId(req.params.id);
            res.render('tasks/detalhes', { task });
        } catch (err) {
            console.error('[tasksController] - erro ao buscar tarefa', err.message);
            res.status(404).send(err.message);
        }
    }

    async formEdicao(req, res) {
        try {
            const task = await this.service.buscarPorId(req.params.id);
            res.render('tasks/editar', { task });
        } catch (err) {
            console.error('[tasksController] - erro ao carregar formulário de edição', err.message);
            res.status(404).send(err.message);
        }
    }

    async atualizar(req, res) {
        try {
            await this.service.atualizar(req.params.id, req.body);
            res.redirect(`/tasks/${req.params.id}`);
        } catch (err) {
            console.error('[tasksController] - erro ao atualizar tarefa', err.message);
            res.status(400).send(err.message);
        }
    }

    async deletar(req, res) {
        try {
            await this.service.deletar(req.params.id);
            res.redirect('/tasks');
        } catch (err) {
            console.error('[tasksController] - erro ao deletar tarefa', err.message);
            res.status(400).send(err.message);
        }
    }
}

module.exports = tasksController;