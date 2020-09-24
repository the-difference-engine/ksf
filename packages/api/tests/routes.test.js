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

  it('returns a 200 when nomination exist', async () => {
    const res = await request(app)
      .get(`/nomination/${nomination.id}`);
    expect(res.statusCode).toBe(200);
  });

  it('return a 404 when nomination does not exist', async () => {
    const res = await request(app)
      .get('/nomination/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });

  it('return a 400 when uuid is not a valid uuid', async () => {
    const res = await request(app)
      .get('/nomination/326');
    expect(res.statusCode).toBe(400);
  });
});

describe('GET user Endpoint', () => {
  let user;

  beforeAll(() => {
    user = db.User.build({
      id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab',
      email: 'test@test.com',
      username: 'test_username',
      password: 'test_password',
    });
    return user.save();
  });

  afterAll(() => {
    user.destroy();
  });

  it('returns a 200 when user exist', async () => {
    const res = await request(app)
      .get(`/user/${user.id}`);
    expect(res.statusCode).toBe(200);
  });

  it('return a 404 when user does not exist', async () => {
    const res = await request(app)
      .get('/user/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });

  it('return a 400 when uuid is not a valid uuid', async () => {
    const res = await request(app)
      .get('/user/326');
    expect(res.statusCode).toBe(400);
  });
});
