const db = require("../config/db.js");
const schema = require("../models/tasksModels.js");

async function validate(data, isPartial = false) {
  const validationSchema = isPartial ? schema.fork(Object.keys(schema.describe().keys), (x) => x.optional()) : schema;
  const { error, value } = validationSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(task) {
    task = await validate(task);
    const result = await db.query(
      `INSERT INTO tasks 
        (nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        task.nome,
        task.descricao,
        task.status ?? "pendente",
        task.prioridade ?? "normal",
        task.prazo,
        task.horario,
        task.projeto_id,
        task.responsavel_id,
      ]
    );
    return { ...task, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em 
       FROM tasks`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em 
       FROM tasks 
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByUserId(userId) {
    const result = await db.query(
      `SELECT id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em 
       FROM tasks 
       WHERE responsavel_id = $1`,
      [userId]
    );
    return result.rows;
  },

  async findByProjectId(projectId) {
    const result = await db.query(
      `SELECT id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em 
       FROM tasks 
       WHERE projeto_id = $1`,
      [projectId]
    );
    return result.rows;
  },

  async update(id, payload) {
    payload = await validate(payload, true);
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (payload.nome !== undefined) {
      fields.push(`nome = $${paramIndex++}`);
      values.push(payload.nome);
    }
    if (payload.descricao !== undefined) {
      fields.push(`descricao = $${paramIndex++}`);
      values.push(payload.descricao);
    }
    if (payload.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(payload.status);
    }
    if (payload.prioridade !== undefined) {
      fields.push(`prioridade = $${paramIndex++}`);
      values.push(payload.prioridade);
    }
    if (payload.prazo !== undefined) {
      fields.push(`prazo = $${paramIndex++}`);
      values.push(payload.prazo);
    }
    if (payload.horario !== undefined) {
      fields.push(`horario = $${paramIndex++}`);
      values.push(payload.horario);
    }
    if (payload.projeto_id !== undefined) {
      fields.push(`projeto_id = $${paramIndex++}`);
      values.push(payload.projeto_id);
    }
    if (payload.responsavel_id !== undefined) {
      fields.push(`responsavel_id = $${paramIndex++}`);
      values.push(payload.responsavel_id);
    }

    values.push(id);
    
    const result = await db.query(
      `UPDATE tasks 
       SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em`,
      values
    );
    return result.rows[0];
  },

  async remove(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },

  async markAsCompleted(id) {
    const result = await db.query(
      `UPDATE tasks 
       SET status = 'concluido' 
       WHERE id = $1
       RETURNING id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em`,
      [id]
    );
    return result.rows[0];
  },

  async markAsIncomplete(id) {
    const result = await db.query(
      `UPDATE tasks 
       SET status = 'pendente' 
       WHERE id = $1
       RETURNING id, nome, descricao, status, prioridade, prazo, horario, projeto_id, responsavel_id, criado_em`,
      [id]
    );
    return result.rows[0];
  },
};
