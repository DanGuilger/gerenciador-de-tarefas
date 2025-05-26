
const svc = require("../services/projectsService");

exports.create = async (req, res) => {
  try {
    const newProject = await svc.create(req.body);
    console.log("Projeto Criado:", newProject);
    res.status(201).json(newProject);
  } catch (e) {
    console.error("Erro ao criar projeto:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const projects = await svc.list();
    console.log("Projetos retornados:", projects);
    res.json(projects);
  } catch (e) {
    console.error("Erro ao listar projetos:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const project = await svc.detail(req.params.id);
    console.log("Projeto encontrado:", project);
    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.json(project);
  } catch (e) {
    console.error("Erro ao buscar projeto:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedProject = await svc.update(req.params.id, req.body);
    console.log("Projeto atualizado:", updatedProject);
    res.json(updatedProject);
  } catch (e) {
    console.error("Erro ao atualizar projeto:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo projeto com ID: ${id}`);
    await svc.remove(id);
    console.log(`Projeto com ID ${id} removido com sucesso`);
    res.sendStatus(204);
  } catch (e) {
    console.error("Erro ao remover projeto:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.findByCreatorId = async (req, res) => {
  try {
    const projects = await svc.findByCreatorId(req.params.creatorId);
    console.log("Projetos do criador:", projects);
    res.json(projects);
  } catch (e) {
    console.error("Erro ao buscar projetos do criador:", e);
    res.status(500).json({ error: e.message });
  }
};