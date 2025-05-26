const db = require("../config/db.js");
const schema = require("../models/projectsModels.js");

async function validate(data, isPartial = false) {
  const validationSchema = isPartial ? schema.fork(Object.keys(schema.describe().keys), (x) => x.optional()) : schema;
  const { error, value } = validationSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(project) {
    project = await validate(project);
    const result = await db.query(
      `INSERT INTO projects 
        (nome, descricao, status, ativo, criador_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        project.nome,
        project.descricao,
        project.status ?? "pendente",
        project.ativo ?? true,
        project.criador_id,
      ]
    );
    return { ...project, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, nome, descricao, status, ativo, criado_em, criador_id 
       FROM projects`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, nome, descricao, status, ativo, criado_em, criador_id 
       FROM projects 
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByCreatorId(creatorId) {
    const result = await db.query(
      `SELECT id, nome, descricao, status, ativo, criado_em, criador_id 
       FROM projects 
       WHERE criador_id = $1`,
      [creatorId]
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
    if (payload.ativo !== undefined) {
      fields.push(`ativo = $${paramIndex++}`);
      values.push(payload.ativo);
    }

    values.push(id);
    
    const result = await db.query(
      `UPDATE projects 
       SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, nome, descricao, status, ativo, criado_em, criador_id`,
      values
    );
    return result.rows[0];
  },

  async remove(id) {
    await db.query("DELETE FROM projects WHERE id = $1", [id]);
  },
};
