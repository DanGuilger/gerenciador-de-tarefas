const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModel');

class usersService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(userData) {
        const { nome_completo, email, senha } = userData;
        
        if (!senha || senha.length < 8) {
            throw new Error('A senha deve ter no mínimo 8 caracteres');
        }

        const usuarioExistente = await this.repository.buscarPorEmail(email);
        if (usuarioExistente) {
            throw new Error('Email já cadastrado');
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        
        const userToValidate = {
            nome_completo,
            email,
            senha_hash,
            ativo: true
        };
        
        const { error } = usersModel.schema.validate(userToValidate);
        
        if (error) {
            console.error('[usersService] - validação falhou', error.details[0].message);
            throw new Error(error.details[0].message);
        }
        
        return await this.repository.inserir({
            nome_completo,
            email,
            senha_hash
        });
    }

    async login(email, senha) {
        const usuario = await this.repository.buscarPorEmail(email);
        
        if (!usuario) {
            throw new Error('Email ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        if (!senhaValida) {
            throw new Error('Email ou senha inválidos');
        }

        return {
            id: usuario.id,
            nome_completo: usuario.nome_completo,
            email: usuario.email
        };
    }
}

module.exports = usersService;