const request = require('supertest');
const app = require('../index'); // adjust path if needed

const apiClient = {
  getEndpoint: () => request(app).get('/api/endpoint'),
  createProspect: (payload) => request(app).post('/api/prospects').send(payload),
};

module.exports = apiClient;