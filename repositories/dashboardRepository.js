const db = require('../config/database');

class DashboardRepository {
    async obterEstatisticasUsuario(usuario_id) {
        const result = await db.query(`
            SELECT 
                (SELECT COUNT(id) FROM projects WHERE criador_id = $1 AND ativo = true) as total_projetos,
                (SELECT COUNT(id) FROM tasks WHERE responsavel_id = $1) as total_tarefas,
                (SELECT COUNT(id) FROM tasks WHERE responsavel_id = $1 AND status = 'concluída') as tarefas_concluidas,
                (SELECT COUNT(id) FROM tasks WHERE responsavel_id = $1 AND status = 'pendente') as tarefas_pendentes,
                (SELECT COUNT(id) FROM tasks WHERE responsavel_id = $1 AND status = 'em progresso') as tarefas_em_progresso
        `, [usuario_id]);
        return result.rows[0];
    }

    async obterTarefasPorPrioridade(usuario_id) {
        const result = await db.query(`
            SELECT prioridade, COUNT(id) as total
            FROM tasks
            WHERE responsavel_id = $1
            GROUP BY prioridade
        `, [usuario_id]);
        return result.rows;
    }

    async obterProjetosRecentes(usuario_id, limite = 5) {
        const result = await db.query(`
            SELECT id, nome, status, criado_em
            FROM projects
            WHERE criador_id = $1 AND ativo = true
            ORDER BY criado_em DESC
            LIMIT $2
        `, [usuario_id, limite]);
        return result.rows;
    }

    async obterTarefasProximas(usuario_id, limite = 10) {
        const result = await db.query(`
            SELECT t.id, t.nome, t.prazo, t.prioridade, p.nome as projeto_nome
            FROM tasks t
            JOIN projects p ON t.projeto_id = p.id
            WHERE t.responsavel_id = $1 
            AND t.status != 'concluída' 
            AND t.prazo IS NOT NULL
            ORDER BY t.prazo ASC
            LIMIT $2
        `, [usuario_id, limite]);
        return result.rows;
    }
}

module.exports = DashboardRepository;