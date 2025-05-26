const commentsRepository = require("../repositories/commentsRepository");

module.exports = {
  async create(commentData) {
    return await commentsRepository.create(commentData);
  },

  async list() {
    return await commentsRepository.findAll();
  },

  async detail(id) {
    return await commentsRepository.findById(id);
  },

  async findByTaskId(taskId) {
    return await commentsRepository.findByTaskId(taskId);
  },

  async update(id, updateData) {
    return await commentsRepository.update(id, updateData);
  },

  async remove(id) {
    return await commentsRepository.remove(id);
  }
};