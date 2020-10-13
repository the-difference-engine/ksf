const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

// memo make test to make sure relations work with Nomination as expected

// memo Jest did not exit one second after the test run has completed.
/* This usually means that there are asynchronous operations that weren't stopped in your tests.
Consider running Jest with `--detectOpenHandles` to troubleshoot this issue. */

const testGrant = {
  name: 'test grant',
  openedOn: new Date('2019-01-01'),
  closedOn: new Date('2020-02-02'),
  isActive: true,
};

describe('POST /grantcycle', () => {
  afterEach(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.log('error afterEach @ POST /grantcycle', error.message);
    }
    return testGrant;
  });

  it('returns a 201 when grant is created', (done) => {
    request(app)
      .post('/grantcycle')
      .send(testGrant)
      .set('Content-Type', 'application/json')
      .expect(201)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('error on creating grant with same name', async (done) => {
    try {
      await db.GrantCycle.create({ ...testGrant, isActive: false });
    } catch (error) {
      console.error(error);
    }
    request(app)
      .post('/grantcycle')
      .send(testGrant)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('error on creating more than one active grant', async (done) => {
    try {
      await db.GrantCycle.create({ ...testGrant, name: 'another one' });
    } catch (error) {
      console.error(error);
    }
    request(app)
      .post('/grantcycle')
      .send(testGrant)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('returns a 400 if openedOn >= ClosedOn', (done) => {
    request(app)
      .post('/grantcycle')
      .send({ ...testGrant, openedOn: testGrant.closedOn })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('returns a 400 on missing name', (done) => {
    request(app)
      .post('/grantcycle')
      .send({
        openedOn: testGrant.openedOn,
        closedOn: testGrant.closedOn,
        isActive: testGrant.isActive,
      })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });
});

describe('PUT /grantcycle', () => {
  let grants;
  beforeAll(async () => {
    try {
      const [firstGrant, secondGrant] = await Promise.all([
        db.GrantCycle.create({ ...testGrant }),
        db.GrantCycle.create({ ...testGrant, isActive: false, name: 'second grant' }),
      ]);
      grants = { firstGrant, secondGrant };
    } catch (error) {
      console.error('error beforeAll @ PUT /grantcycle', error);
    }
    return grants;
  });

  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.log('error afterEach @ PUT /grantcycle', error.message);
    }
  });

  it('400 if no ID is provided', (done) => {
    request(app)
      .put('/grantcycle')
      .send(null)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });
  it('404 if no grant found for given uuid', (done) => {
    const id = '938e6eb7-4959-4a34-a31b-55cb5a8ea31a';
    request(app)
      .put('/grantcycle')
      .send({ id })
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('400 if requesting to turn grant active when there is already an active grant', async (done) => {
    request(app)
      .put('/grantcycle')
      .send({ id: grants.secondGrant.id, isActive: true })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('400 on any validation error', (done) => {
    request(app)
      .put('/grantcycle')
      .send({ id: grants.secondGrant.id, name: grants.firstGrant.name })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });
});

describe('GET /grantcycle/findall', () => {
  let grants;
  beforeAll(async () => {
    try {
      const [firstGrant, secondGrant] = await Promise.all([
        db.GrantCycle.create({ ...testGrant }),
        db.GrantCycle.create({ ...testGrant, isActive: false, name: 'second grant' }),
      ]);
      grants = { firstGrant, secondGrant };
    } catch (error) {
      console.error('error beforeAll @ GET /grantcycle/findall', error);
    }
    return grants;
  });

  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error afterEach @ GET /grantcycle/findall', error);
    }
  });

  it('200 returns all cycles', async (done) => {
    try {
      const res = await request(app).get('/grantcycle/findall');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      await done();
    } catch (error) {
      console.error('error @ GET /grantcycle/findall', error);
    }
  });
  it('200 returns empty array if no cycles', async (done) => {
    try {
      await db.GrantCycle.destroy({ where: {} });
      const res = await request(app).get('/grantcycle/findall');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(0);
      await done();
    } catch (error) {
      console.error('error @ GET /grantcycle/findall', error);
    }
  });
});

describe('POST /grantcycle/findbyname', () => {
  let grants;
  beforeAll(async () => {
    try {
      const [firstGrant, secondGrant] = await Promise.all([
        db.GrantCycle.create({ ...testGrant }),
        db.GrantCycle.create({ ...testGrant, isActive: false, name: 'second grant' }),
      ]);
      grants = { firstGrant, secondGrant };
    } catch (error) {
      console.error('error beforeAll @ POST /grantcycle/findbyname', error);
    }
    return grants;
  });
  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error afterEach @ POST /grantcycle/findbyname', error);
    }
  });

  it('400 on missing name input', (done) => {
    const req = { dummyKey: 'none' };
    request(app)
      .post('/grantcycle/findbyname')
      .send(req)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({});
        expect(req).not.toEqual(expect.objectContaining({
          name: expect.any(String),
        }));
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
  it('200 returns grant cycle', (done) => {
    const req = { name: testGrant.name };
    request(app)
      .post('/grantcycle/findbyname')
      .send(req)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        // checks for the keys of res.body to be included in a new instance of GrantCycle
        // couldn't figure how to do this with only object comparison and keep it in one line
        expect(Object.keys(res.body))
          .toEqual(expect.arrayContaining(Object.keys(new db.GrantCycle(testGrant).dataValues)));
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
  it('200 returns null if grant does not exist', (done) => {
    const req = { name: 'non-existent grant' };
    request(app)
      .post('/grantcycle/findbyname')
      .send(req)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeNull();
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
});

describe('GET /grantcycle/findactive', () => {
  beforeAll(async () => {
    try {
      await db.GrantCycle.create(testGrant);
    } catch (error) {
      console.error('error beforeAll @ GET /grantcycle/findactive', error.message);
    }
  });
  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error afterAll @ GET /grantcycle/findactive', error.message);
    }
  });
  it('200 returns active grant', (done) => {
    request(app)
      .get('/grantcycle/findactive')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
        expect(res.body.isActive).toBe(true);
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
  it('200 returns null, no active grants', async (done) => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error @ GET /grantcycle/findactive', error.message);
    }
    request(app)
      .get('/grantcycle/findactive')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeNull();
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
});
