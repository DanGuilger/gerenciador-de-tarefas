const svc = require("../services/usersService");

exports.create = async (req, res) => {
  try {
    const newUser = await svc.create(req.body);
    console.log("Usuário Criado:", newUser);
    res.status(201).json(newUser);
  } catch (e) {
    console.error("Erro ao criar usuário:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const users = await svc.list();
    console.log("Usuários retornados:", users);
    res.json(users);
  } catch (e) {
    console.error("Erro ao listar usuários:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const user = await svc.detail(req.params.id);
    console.log("Usuário encontrado:", user);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedUser = await svc.update(req.params.id, req.body);
    console.log("Usuário atualizado:", updatedUser);
    res.json(updatedUser);
  } catch (e) {
    console.error("Erro ao atualizar usuário:", e);
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo usuário com ID: ${id}`);
    await svc.remove(id);
    console.log(`Usuário com ID ${id} removido com sucesso`);
    res.sendStatus(204);
  } catch (e) {
    console.error("Erro ao remover usuário:", e);
    res.status(500).json({ error: e.message });
  }
};
