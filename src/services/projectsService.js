const repo = require("../repositories/projectsRepository");

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
    
    const existingProject = await repo.findById(Number(id));
    if (!existingProject) {
      throw new Error("Projeto não encontrado");
    }
    
    return await repo.update(Number(id), data);
  },

  async remove(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingProject = await repo.findById(Number(id));
    if (!existingProject) {
      throw new Error("Projeto não encontrado");
    }
    
    return await repo.remove(Number(id));
  },

  async findByCreatorId(creatorId) {
    if (!creatorId || isNaN(Number(creatorId))) {
      throw new Error("ID do criador inválido");
    }
    return await repo.findByCreatorId(Number(creatorId));
  }
};