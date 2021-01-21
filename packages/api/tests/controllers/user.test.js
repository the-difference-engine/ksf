const request = require('supertest');
const app = require('../../server');
const db = require('../../models');
describe('GET user Endpoint', () => {
  let user;
  beforeAll(() => {
    user = db.User.build({
      id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab',
      email: 'test@test.com',
      username: 'test_username',
    });
    return user.save();
  });
  afterAll(() => {
    user.destroy();
  });
  it('returns a 200 when user exist', async () => {
    const res = await request(app)
      .get(`/api/user/${user.id}`);
    expect(res.statusCode).toBe(200);
  });
  it('return a 404 when user does not exist', async () => {
    const res = await request(app)
      .get('/api/user/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });
  it('return a 400 when uuid is not a valid uuid', async () => {
    const res = await request(app)
      .get('/api/user/326');
    expect(res.statusCode).toBe(400);
  });
});
describe('POST user Endpoint', () => {
  const user = {
    email: 'test@test.com',
    username: 'test_username',
  };
  let newUser;
  beforeEach(async () => {
    return await db.User.create(user);
  });
  afterEach(async () => {
    await db.User.destroy({ where: {} });
  });
  it('returns 201 when user is created', (done) => {
    request(app)
      .post(`/api/user`)
      .set('Content-Type', 'application/json')
      .send({ ...user, email: 'unique@email.com' })
      .end((error, res) => {
        expect(res.statusCode).toBe(201);
        // if (error) return done(error);
        return done(error);
      });
  });
  it('returns 400 if user email already exists', (done) => {
    request(app)
      .post(`/api/user`)
      .set('Content-Type', 'application/json')
      .send(user)
      .end((error, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Email already in use!');
        // if (error) return done(error);
        return done(error);
      });
  });
  it('returns 400 on missing email', async (done) => {
    const { username} = user;
    request(app)
      .post(`/api/user`)
      .set('Content-Type', 'application/json')
      .send({ username})
      .end((error, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('notNull Violation: User.email cannot be null');
        // if (error) return done(error);
        return done(error);
      });
  });
});