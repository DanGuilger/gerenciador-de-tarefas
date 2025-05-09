
const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const db = require('../config/db');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

jest.mock('../config/db');

describe('User Routes', () => {
  test('GET /users deve retornar todos os usuários', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
  });

  test('GET /users/:id deve retornar um usuário pelo ID', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });

    const res = await request(app).get('/users/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  test('POST /users deve criar um novo usuário', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
    });

    const res = await request(app).post('/users').send({ name: 'John Doe', email: 'john@example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  test('PUT /users/:id deve atualizar um usuário', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
    });

    const res = await request(app).put('/users/1').send({ name: 'John Doe', email: 'john@example.com' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  test('DELETE /users/:id deve deletar um usuário', async () => {
    db.query.mockResolvedValue({ rowCount: 1 });

    const res = await request(app).delete('/users/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Usuário deletado' });
  });
});
