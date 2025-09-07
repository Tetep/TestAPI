function expectJsonArray(res, key) {
  expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
  expect(Array.isArray(res.body[key])).toBe(true);
}

function expectError(res, statusCode, message) {
  expect(res.statusCode).toBe(statusCode);
  expect(res.body).toHaveProperty('error', message);
}

module.exports = { expectJsonArray, expectError };