const api = require('./apiClient.js');

describe('GET /api/endpoint', () => {
  it('returns data array', async () => {
    const res = await api.getEndpoint();
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});