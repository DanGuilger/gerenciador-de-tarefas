const db = require('../config/database');

class ProjectsRepository {
    async inserir(project) {
        const { nome, descricao, status, criador_id } = project;
        const result = await db.query(`
            INSERT INTO projects (nome, descricao, status, criador_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, descricao, status, ativo, criado_em, criador_id
        `, [nome, descricao, status, criador_id]);
        return result.rows[0];
    }

    async listarPorUsuario(criador_id) {
        const result = await db.query(`
            SELECT id, nome, descricao, status, ativo, criado_em, criador_id
            FROM projects
            WHERE criador_id = $1 AND ativo = true
            ORDER BY criado_em DESC
        `, [criador_id]);
        return result.rows;
    }

    async buscarPorId(id) {
        const result = await db.query(`
            SELECT id, nome, descricao, status, ativo, criado_em, criador_id
            FROM projects
            WHERE id = $1
        `, [id]);
        return result.rows[0];
    }

    async atualizar(id, project) {
        const { nome, descricao, status } = project;
        const result = await db.query(`
            UPDATE projects
            SET nome = $1, descricao = $2, status = $3
            WHERE id = $4
            RETURNING id, nome, descricao, status, ativo, criado_em, criador_id
        `, [nome, descricao, status, id]);
        return result.rows[0];
    }

    async deletar(id) {
        const result = await db.query(`
            UPDATE projects
            SET ativo = false
            WHERE id = $1
            RETURNING id
        `, [id]);
        return result.rows[0];
    }
}

module.exports = ProjectsRepository;