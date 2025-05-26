const db = require("../config/db.js");
const schema = require("../models/usersModels.js");

async function validate(data, isPartial = false) {
  const validationSchema = isPartial ? schema.fork(Object.keys(schema.describe().keys), (x) => x.optional()) : schema;
  const { error, value } = validationSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(user) {
    user = await validate(user);
    const result = await db.query(
      `INSERT INTO users 
        (nome_completo, senha_hash, email, ativo)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        user.nome_completo || user.full_name,
        user.senha_hash || user.password_hash,
        user.email,
        user.ativo !== undefined ? user.ativo : (user.is_active !== undefined ? user.is_active : true),
      ]
    );
    return { ...user, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, nome_completo as full_name, email, ativo as is_active 
       FROM users`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, nome_completo as full_name, email, ativo as is_active 
       FROM users
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(
      `SELECT id, nome_completo as full_name, email, ativo as is_active, senha_hash as password_hash
       FROM users
       WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload, true);
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (payload.nome_completo !== undefined || payload.full_name !== undefined) {
      fields.push(`nome_completo = $${paramIndex++}`);
      values.push(payload.nome_completo || payload.full_name);
    }
    if (payload.senha_hash !== undefined || payload.password_hash !== undefined) {
      fields.push(`senha_hash = $${paramIndex++}`);
      values.push(payload.senha_hash || payload.password_hash);
    }
    if (payload.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(payload.email);
    }
    if (payload.ativo !== undefined || payload.is_active !== undefined) {
      fields.push(`ativo = $${paramIndex++}`);
      values.push(payload.ativo !== undefined ? payload.ativo : payload.is_active);
    }

    values.push(id);
    
    const result = await db.query(
      `UPDATE users
       SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, nome_completo as full_name, email, ativo as is_active`,
      values
    );
    
    if (result.rows.length === 0) {
      throw new Error("Usuário não encontrado");
    }
    
    return result.rows[0];
  },

  async remove(id) {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      throw new Error("Usuário não encontrado");
    }
  },
};