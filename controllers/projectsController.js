class projectsController {
    constructor(service) {
        this.service = service;
        this.tasksService = null;
    }

    setTasksService(tasksService) {
        this.tasksService = tasksService;
    }

    async listar(req, res) {
        try {
            const projects = await this.service.listarPorUsuario(req.usuario_id || 1);
            res.render('projects/lista', { projects });
        } catch (err) {
            console.error('[projectsController] - erro ao listar projetos', err.message);
            res.status(400).send(err.message);
        }
    }

    formCadastro(req, res) {
        res.render('projects/cadastro');
    }

    async cadastrar(req, res) {
        try {
            const project = {...req.body, criador_id: req.usuario_id || 1};
            await this.service.cadastrar(project);
            res.redirect('/projects');
        } catch (err) {
            console.error('[projectsController] - erro na criação do projeto', err.message);
            res.status(400).send(err.message);
        }
    }

    async detalhes(req, res) {
        try {
            const project = await this.service.buscarPorId(req.params.id);
            
            // Buscar as tarefas do projeto
            let tasks = [];
            if (this.tasksService) {
                tasks = await this.tasksService.listarPorProjeto(req.params.id);
            }
            
            res.render('projects/detalhes', { project, tasks });
        } catch (err) {
            console.error('[projectsController] - erro ao buscar projeto', err.message);
            res.status(404).send(err.message);
        }
    }

    async formEdicao(req, res) {
        try {
            const project = await this.service.buscarPorId(req.params.id);
            res.render('projects/editar', { project });
        } catch (err) {
            console.error('[projectsController] - erro ao carregar formulário de edição', err.message);
            res.status(404).send(err.message);
        }
    }

    async atualizar(req, res) {
        try {
            await this.service.atualizar(req.params.id, req.body);
            res.redirect(`/projects/${req.params.id}`);
        } catch (err) {
            console.error('[projectsController] - erro ao atualizar projeto', err.message);
            res.status(400).send(err.message);
        }
    }

    async deletar(req, res) {
        try {
            await this.service.deletar(req.params.id);
            res.redirect('/projects');
        } catch (err) {
            console.error('[projectsController] - erro ao deletar projeto', err.message);
            res.status(400).send(err.message);
        }
    }
}

module.exports = projectsController;