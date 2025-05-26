const repo = require("../repositories/usersRepository");

module.exports = {
  async create(data) {
    return await repo.create(data);
  },

  async list() {
    return await repo.findAll();
  },

  async detail(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    return await repo.findById(Number(id));
  },

  async update(id, data) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingUser = await repo.findById(Number(id));
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }
    
    return await repo.update(Number(id), data);
  },

  async remove(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingUser = await repo.findById(Number(id));
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }
    
    return await repo.remove(Number(id));
  }
};