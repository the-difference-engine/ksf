const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

// TODO make test to make sure relations work with Nomination as expected

describe('POST Grant Cycle Endpoint', () => {
  let body = {};

  beforeAll(() => {
    body = {
      name: "test grant",
      openedOn: new Date("2019-01-01"),
      closedOn: new Date("2020-01-01")
    };
    return body;
  });

  it('returns a 201 when grant is created', async () => {
    try {
      const res = await request(app)
        .post("/grantcycle/new")
        .send(body)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      expect(res.statusCode).toBe(201);

    } catch (error) {
      throw error;
    }
  });

  it('returns a 400 if openedOn >= ClosedOn', async () => {
    body.openedOn = body.closedOn;
    try {
      const res = await request(app)
        .post("/grantcycle/new")
        .send(body)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      expect(res.statusCode).toBe(400);
    } catch (error) {
      throw error;
    }
  });

  it('returns a 400 on missing name', async () => {
    delete body.name;
    try {
      const res = await request(app)
        .post("/grantcycle/new")
        .send(body)
        .set('Content-Type', 'application/x-www-form-urlencoded');

      expect(res.statusCode).toBe(400);
    } catch (error) {
      throw error;
    }
  });
});
