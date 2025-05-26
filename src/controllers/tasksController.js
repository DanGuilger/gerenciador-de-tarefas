const svc = require("../services/tasksService");

exports.create = async (req, res) => {
  try {
    const newTask = await svc.create(req.body);
    console.log("Tarefa Criada:", newTask);
    res.status(201).json(newTask);
  } catch (e) {
    console.error("Erro ao criar tarefa:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const tasks = await svc.list();
    console.log("Tarefas retornadas:", tasks);
    res.json(tasks);
  } catch (e) {
    console.error("Erro ao listar tarefas:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const task = await svc.detail(req.params.id);
    console.log("Tarefa encontrada:", task);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (e) {
    console.error("Erro ao buscar tarefa:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTask = await svc.update(req.params.id, req.body);
    console.log("Tarefa atualizada:", updatedTask);
    res.json(updatedTask);
  } catch (e) {
    console.error("Erro ao atualizar tarefa:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo tarefa com ID: ${id}`);
    await svc.remove(id);
    console.log(`Tarefa com ID ${id} removida com sucesso`);
    res.sendStatus(204);
  } catch (e) {
    console.error("Erro ao remover tarefa:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.markAsCompleted = async (req, res) => {
  try {
    const updatedTask = await svc.markAsCompleted(req.params.id);
    console.log("Tarefa marcada como concluída:", updatedTask);
    res.json(updatedTask);
  } catch (e) {
    console.error("Erro ao marcar tarefa como concluída:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.markAsIncomplete = async (req, res) => {
  try {
    const updatedTask = await svc.markAsIncomplete(req.params.id);
    console.log("Tarefa marcada como não concluída:", updatedTask);
    res.json(updatedTask);
  } catch (e) {
    console.error("Erro ao marcar tarefa como não concluída:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.findByUserId = async (req, res) => {
  try {
    const tasks = await svc.findByUserId(req.params.userId);
    console.log("Tarefas do usuário:", tasks);
    res.json(tasks);
  } catch (e) {
    console.error("Erro ao buscar tarefas do usuário:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.findByProjectId = async (req, res) => {
  try {
    const tasks = await svc.findByProjectId(req.params.projectId);
    console.log("Tarefas do projeto:", tasks);
    res.json(tasks);
  } catch (e) {
    console.error("Erro ao buscar tarefas do projeto:", e);
    res.status(500).json({ error: e.message });
  }
};