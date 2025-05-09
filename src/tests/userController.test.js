// tests/userController.test.js

const userController = require('../src/controllers/userController');
const userService = require('../services/userService');

jest.mock('../services/userService');

describe('userController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('getAllUsers deve retornar todos os usuários', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
    userService.getAllUsers.mockResolvedValueOnce(mockUsers);

    await userController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test('getUserById deve retornar o usuário correto', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.params = { id: '1' };
    userService.getUserById.mockResolvedValueOnce(mockUser);

    await userController.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('createUser deve criar um novo usuário', async () => {
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.body = { name: 'John Doe', email: 'john@example.com' };
    userService.createUser.mockResolvedValueOnce(newUser);

    await userController.createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  test('updateUser deve atualizar um usuário', async () => {
    const updatedUser = { id: '1', name: 'John Doe', email: 'john_updated@example.com' };
    req.params = { id: '1' };
    req.body = { name: 'John Doe', email: 'john_updated@example.com' };
    userService.updateUser.mockResolvedValueOnce(updatedUser);

    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  test('deleteUser deve deletar um usuário', async () => {
    const deletedUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.params = { id: '1' };
    userService.deleteUser.mockResolvedValueOnce(deletedUser);

    await userController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deletedUser);
  });
});