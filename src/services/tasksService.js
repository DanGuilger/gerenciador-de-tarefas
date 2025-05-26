const repo = require("../repositories/tasksRepository");

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
    
    const existingTask = await repo.findById(Number(id));
    if (!existingTask) {
      throw new Error("Tarefa não encontrada");
    }
    
    return await repo.update(Number(id), data);
  },

  async remove(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingTask = await repo.findById(Number(id));
    if (!existingTask) {
      throw new Error("Tarefa não encontrada");
    }
    
    return await repo.remove(Number(id));
  },

  async markAsCompleted(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingTask = await repo.findById(Number(id));
    if (!existingTask) {
      throw new Error("Tarefa não encontrada");
    }
    
    return await repo.markAsCompleted(Number(id));
  },

  async markAsIncomplete(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido");
    }
    
    const existingTask = await repo.findById(Number(id));
    if (!existingTask) {
      throw new Error("Tarefa não encontrada");
    }
    
    return await repo.markAsIncomplete(Number(id));
  },

  async findByUserId(userId) {
    if (!userId || isNaN(Number(userId))) {
      throw new Error("ID do usuário inválido");
    }
    return await repo.findByUserId(Number(userId));
  },

  async findByProjectId(projectId) {
    if (!projectId || isNaN(Number(projectId))) {
      throw new Error("ID do projeto inválido");
    }
    return await repo.findByProjectId(Number(projectId));
  }
};