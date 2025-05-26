const db = require("../config/db.js");
const schema = require("../models/commentsModels.js");

async function validate(data, isPartial = false) {
  try {
    const validationSchema = isPartial ? schema.fork(Object.keys(schema.describe().keys), (x) => x.optional()) : schema;
    const { error, value } = validationSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
    return value;
  } catch (validationError) {
    console.error('Erro de validação:', validationError);
    throw validationError;
  }
}

module.exports = {
  async create(comment) {
    try {
      console.log('Dados antes da validação:', comment);
      
      // Validar dados
      const validatedComment = await validate(comment);
      console.log('Dados após validação:', validatedComment);
      
      // Garantir que criado_em tem um valor
      if (!validatedComment.criado_em) {
        validatedComment.criado_em = new Date().toISOString();
      }
      
      const result = await db.query(
        `INSERT INTO comments 
          (conteudo, tarefa_id, autor_id, criado_em)
         VALUES ($1, $2, $3, $4)
         RETURNING id, conteudo, criado_em, tarefa_id, autor_id`,
        [
          validatedComment.conteudo,
          validatedComment.tarefa_id,
          validatedComment.autor_id || null,
          validatedComment.criado_em,
        ]
      );
      
      console.log('Resultado da inserção:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro no repository create:', error);
      throw error;
    }
  },

  async findAll() {
    try {
      const result = await db.query(
        `SELECT id, conteudo, criado_em, tarefa_id, autor_id 
         FROM comments
         ORDER BY criado_em DESC`
      );
      return result.rows;
    } catch (error) {
      console.error('Erro no repository findAll:', error);
      throw error;
    }
  },

  async findById(id) {
    try {
      const result = await db.query(
        `SELECT id, conteudo, criado_em, tarefa_id, autor_id 
         FROM comments 
         WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro no repository findById:', error);
      throw error;
    }
  },

  async findByTaskId(tarefa_id) {
    try {
      const result = await db.query(
        `SELECT id, conteudo, criado_em, tarefa_id, autor_id 
         FROM comments 
         WHERE tarefa_id = $1
         ORDER BY criado_em ASC`,
        [tarefa_id]
      );
      return result.rows;
    } catch (error) {
      console.error('Erro no repository findByTaskId:', error);
      throw error;
    }
  },

  async update(id, payload) {
    try {
      const validatedPayload = await validate(payload, true);
      
      if (!validatedPayload.conteudo) {
        throw new Error("Conteúdo é obrigatório para atualização");
      }

      const result = await db.query(
        `UPDATE comments 
         SET conteudo = $1 
         WHERE id = $2
         RETURNING id, conteudo, criado_em, tarefa_id, autor_id`,
        [
          validatedPayload.conteudo,
          id,
        ]
      );
      
      if (result.rows.length === 0) {
        throw new Error("Comentário não encontrado");
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro no repository update:', error);
      throw error;
    }
  },

  async remove(id) {
    try {
      const result = await db.query("DELETE FROM comments WHERE id = $1 RETURNING id", [id]);
      if (result.rows.length === 0) {
        throw new Error("Comentário não encontrado");
      }
      return result.rows[0];
    } catch (error) {
      console.error('Erro no repository remove:', error);
      throw error;
    }
  },
};