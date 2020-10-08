const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

// TODO make test to make sure relations work with Nomination as expected

describe('POST Grant Cycle Endpoint', () => {
  let body = {};

  beforeEach(() => {
    body = {
      name: "test grant",
      openedOn: new Date("2019-01-01"),
      closedOn: new Date("2020-02-02"),
    };
    return body;
  });

  it('returns a 201 when grant is created', (done) => {
    request(app)
      .post("/grantcycle")
      .send(body)
      .set('Content-Type', 'application/json')
      .expect(201)
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });

  it('returns a 400 if openedOn >= ClosedOn', (done) => {
    body.openedOn = body.closedOn;
    request(app)
      .post("/grantcycle")
      .send(body)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });

  it('returns a 400 on missing name', (done) => {
    delete body.name;
    request(app)
      .post("/grantcycle")
      .send(body)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error) => {
        if (error) return done(error);
        done();
      });
  });
});
