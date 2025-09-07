// __tests__/prospects.test.js
const request = require('supertest');
const app = require('../index');

describe('Prospects API CRUD', () => {
  let createdId;

  test('GET /v1/prospects → 200 & array', async () => {
    const res = await request(app).get('/v1/prospects');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /v1/prospects → 201 & new prospect', async () => {
    const newProspect = { name: 'TestCo', contact: 'Alice', email: 'a@test.co' };
    const res = await request(app)
      .post('/v1/prospects')
      .send(newProspect)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newProspect);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('GET /v1/prospects/:id → 200 & correct item', async () => {
    const res = await request(app).get(`/v1/prospects/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  test('PUT /v1/prospects/:id → 200 & updated item', async () => {
    const update = { email: 'alice@updated.co' };
    const res = await request(app)
      .put(`/v1/prospects/${createdId}`)
      .send(update)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(update.email);
  });

  test('DELETE /v1/prospects/:id → 200 & delete message', async () => {
    const res = await request(app).delete(`/v1/prospects/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Prospect deleted');
  });

  test('GET deleted → 404', async () => {
    const res = await request(app).get(`/v1/prospects/${createdId}`);
    expect(res.statusCode).toBe(404);
  });
});