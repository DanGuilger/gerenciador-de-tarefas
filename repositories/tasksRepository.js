const db = require('../config/database');

class tasksRepository {
    async inserir(task) {
        const { nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id } = task;
        const result = await db.query(`
            INSERT INTO tasks (nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em
        `, [nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id]);
        return result.rows[0];
    }

    async listarPorProjeto(projeto_id) {
        const result = await db.query(`
            SELECT t.id, t.nome, t.descricao, t.status, t.prioridade, t.prazo, t.horario, 
                   t.responsavel_id, t.criado_em, u.nome_completo as responsavel_nome
            FROM tasks t
            JOIN users u ON t.responsavel_id = u.id
            WHERE t.projeto_id = $1
            ORDER BY t.criado_em DESC
        `, [projeto_id]);
        return result.rows;
    }

    async buscarPorId(id) {
        const result = await db.query(`
            SELECT t.id, t.nome, t.descricao, t.status, t.prioridade, t.prazo, t.horario, 
                   t.projeto_id, t.responsavel_id, t.criado_em, u.nome_completo as responsavel_nome
            FROM tasks t
            JOIN users u ON t.responsavel_id = u.id
            WHERE t.id = $1
        `, [id]);
        return result.rows[0];
    }

    async atualizar(id, task) {
        const { nome, descricao, status, prioridade, prazo, horario, responsavel_id } = task;
        const result = await db.query(`
            UPDATE tasks
            SET nome = $1, descricao = $2, status = $3, prioridade = $4, 
                prazo = $5, horario = $6, responsavel_id = $7
            WHERE id = $8
            RETURNING id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em
        `, [nome, descricao, status, prioridade, prazo, horario, responsavel_id, id]);
        return result.rows[0];
    }

    async deletar(id) {
        const result = await db.query(`
            DELETE FROM tasks
            WHERE id = $1
            RETURNING id
        `, [id]);
        return result.rows[0];
    }
}

module.exports = tasksRepository;