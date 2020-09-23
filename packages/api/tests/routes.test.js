const request = require('supertest');
const app = require('../server');
const db = require('../models');

describe('GET Nomination Endpoint', () => {
  let nomination;

  beforeAll(() => {
    nomination = db.Nomination.build({ id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab' });
    return nomination.save();
  });

  afterAll(() => {
    nomination.destroy();
  });

  it('when nomination exist it should return a 200', async () => {
    const res = await request(app)
      .get(`/nomination/${nomination.id}`);
    expect(res.statusCode).toBe(200);
  });

  it('when nomination does not exist it should return a 404', async () => {
    const res = await request(app)
      .get('/nomination/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });
});
