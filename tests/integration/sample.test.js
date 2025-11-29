const request = require('supertest');
const app = require('../../app');

describe('Integration Test: Events API', () => {
  it('GET /api/v1/events should return 404 (no route for GET)', async () => {
    const res = await request(app).get('/api/v1/events');
    expect(res.statusCode).toBe(404);
  });
});