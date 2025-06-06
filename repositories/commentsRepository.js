const db = require('../config/database');

class CommentsRepository {
    async inserir(comment) {
        const { conteudo, tarefa_id, autor_id } = comment;
        const result = await db.query(`
            INSERT INTO comments (conteudo, tarefa_id, autor_id)
            VALUES ($1, $2, $3)
            RETURNING id, conteudo, criado_em, tarefa_id, autor_id
        `, [conteudo, tarefa_id, autor_id]);
        return result.rows[0];
    }

    async listarPorTarefa(tarefa_id) {
        const result = await db.query(`
            SELECT c.id, c.conteudo, c.criado_em, c.autor_id, u.nome_completo as autor_nome
            FROM comments c
            JOIN users u ON c.autor_id = u.id
            WHERE c.tarefa_id = $1
            ORDER BY c.criado_em ASC
        `, [tarefa_id]);
        return result.rows;
    }

    async deletar(id) {
        const result = await db.query(`
            DELETE FROM comments
            WHERE id = $1
            RETURNING id
        `, [id]);
        return result.rows[0];
    }
}

module.exports = CommentsRepository;