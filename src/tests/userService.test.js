// tests/userService.test.js

const userService = require('../services/userService');
const db = require('../config/db');

jest.mock('../config/db');

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers deve retornar todos os usuários', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
    db.query.mockResolvedValueOnce({ rows: mockUsers });

    const users = await userService.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  test('getUserById deve retornar o usuário correto', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    db.query.mockResolvedValueOnce({ rows: [mockUser] });

    const user = await userService.getUserById('1');
    expect(user).toEqual(mockUser);
  });

  test('createUser deve criar um novo usuário', async () => {
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    db.query.mockResolvedValueOnce({ rows: [newUser] });

    const createdUser = await userService.createUser('John Doe', 'john@example.com');
    expect(createdUser).toEqual(newUser);
  });

  test('updateUser deve atualizar um usuário', async () => {
    const updatedUser = { id: '1', name: 'John Doe', email: 'john_updated@example.com' };
    db.query.mockResolvedValueOnce({ rows: [updatedUser] });

    const result = await userService.updateUser('1', 'John Doe', 'john_updated@example.com');
    expect(result).toEqual(updatedUser);
  });

  test('deleteUser deve deletar um usuário', async () => {
    const deletedUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    db.query.mockResolvedValueOnce({ rows: [deletedUser] });

    const result = await userService.deleteUser('1');
    expect(result).toEqual(deletedUser);
  });
});