class authController {
    constructor(service) {
        this.service = service;
    }

    formLogin(req, res) {
        res.render('auth/login');
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await this.service.login(email, senha);
            
            req.session = req.session || {};
            req.session.usuario = usuario;
            
            res.redirect('/dashboard');
        } catch (err) {
            console.error('[authController] - erro no login', err.message);
            res.render('auth/login', { erro: err.message });
        }
    }

    formCadastro(req, res) {
        res.render('auth/cadastro');
    }

    async cadastrar(req, res) {
        try {
            await this.service.cadastrar(req.body);
            res.redirect('/login');
        } catch (err) {
            console.error('[authController] - erro no cadastro', err.message);
            res.render('auth/cadastro', { erro: err.message });
        }
    }

    logout(req, res) {
        req.session = null;
        res.redirect('/login');
    }
}

module.exports = authController;