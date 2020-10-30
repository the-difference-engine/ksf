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
      password: 'test_password',
    });
    return user.save();
  });

  afterAll(() => {
    user.destroy();
  });

  xit('returns a 200 when user exist', async () => {
    const res = await request(app)
      .get(`/user/${user.id}`);
    expect(res.statusCode).toBe(200);
  });

  xit('return a 404 when user does not exist', async () => {
    const res = await request(app)
      .get('/user/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });

  xit('return a 400 when uuid is not a valid uuid', async () => {
    const res = await request(app)
      .get('/user/326');
    expect(res.statusCode).toBe(400);
  });
});

describe('POST user Endpoint', () => {
  const user = {
    email: 'test@test.com',
    username: 'test_username',
  };

  afterAll(async () => {
    await db.User.destroy();
  });

  it('returns 201 when user is created', (done) => {
    request(app)
      .post(`/user`)
      .set('Content-Type', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        console.log(res.body);
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('returns 400 if user already exists', (done) => {
    request(app)
      .post(`/user`)
      .set('Content-Type', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        console.log(res.text);
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('returns 400 on missing email', async () => {
    request(app)
      .post(`/user`)
      .set('Content-Type', 'application/json')
      .send({ username: user.username })
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        console.log(res.text);
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
