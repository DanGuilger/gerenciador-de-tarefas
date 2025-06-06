const db = require('../config/database');

class usersRepository {
    async inserir(user) {
        const { nome_completo, email, senha_hash } = user;
        const result = await db.query(`
            INSERT INTO users (nome_completo, email, senha_hash)
            VALUES ($1, $2, $3)
            RETURNING id, nome_completo, email, ativo
        `, [nome_completo, email, senha_hash]);
        return result.rows[0];
    }

    async buscarPorEmail(email) {
        const result = await db.query(`
            SELECT id, nome_completo, email, senha_hash, ativo
            FROM users
            WHERE email = $1 AND ativo = true
        `, [email]);
        return result.rows[0];
    }
}

module.exports = usersRepository;