const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

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

  it('returns 400 on creating more than one active grant', async (done) => {
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
  it('400 fail on non-unique names', async (done) => {
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

  it('returns 200 on successfully updating name', (done) => {
    const { id } = grants.secondGrant;
    request(app)
      .put(`/grantcycle/${id}`)
      .send({ name: 'another unique name' })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((error, res) => {
        expect(res.body.name).toBe('another unique name');
        if (error) return done(error);
        done();
      });
  });
  it('returns 200 on successfully updating Active --> Inactive', (done) => {
    const { id } = grants.secondGrant;
    request(app)
      .put(`/grantcycle/${id}`)
      .send({ isActive: false })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((error, res) => {
        expect(res.body.isActive).toBe(false);
        if (error) return done(error);
        done();
      });
  });
  it('returns 400 if no ID is provided', (done) => {
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
  it('returns 404 if no grant found for given uuid', (done) => {
    const id = '938e6eb7-4959-4a34-a31b-55cb5a8ea31a';
    request(app)
      .put(`/grantcycle/${id}`)
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('returns 400 if requesting to turn grant active when there is already an active grant', async (done) => {
    const { id } = grants.secondGrant;
    request(app)
      .put(`/grantcycle/${id}`)
      .send({ isActive: true })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });

  it('returns 400 on renaming grant to already existing name', (done) => {
    const { id } = grants.secondGrant;
    request(app)
      .put(`/grantcycle/${id}`)
      .send({ name: grants.firstGrant.name })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, res) => {
        console.log(res.text);
        if (error) return done(error);
        done();
      });
  });
});

describe('GET /grantcycles', () => {
  let grants;
  beforeAll(async () => {
    try {
      const [firstGrant, secondGrant] = await Promise.all([
        db.GrantCycle.create({ ...testGrant }),
        db.GrantCycle.create({ ...testGrant, isActive: false, name: 'second grant' }),
      ]);
      grants = { firstGrant, secondGrant };
    } catch (error) {
      console.error('error beforeAll @ GET /grantcycles', error);
    }
    return grants;
  });

  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error afterEach @ GET /grantcycles', error);
    }
  });

  it('returns 200 && all grant cycles', async (done) => {
    try {
      const res = await request(app).get('/grantcycles');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      await done();
    } catch (error) {
      console.error('error @ GET /grantcycles', error);
    }
  });
  it('returns 404 if no grant cycles found', async (done) => {
    try {
      await db.GrantCycle.destroy({ where: {} });
      const res = await request(app).get('/grantcycles');
      expect(res.statusCode).toEqual(404);
      await done();
    } catch (error) {
      console.error('error @ GET /grantcycles', error);
    }
  });
});

describe('GET /grantcycle/findbyname/:name', () => {
  let grants;
  beforeAll(async () => {
    try {
      const [firstGrant, secondGrant] = await Promise.all([
        db.GrantCycle.create({ ...testGrant }),
        db.GrantCycle.create({ ...testGrant, isActive: false, name: 'second grant' }),
      ]);
      grants = { firstGrant, secondGrant };
    } catch (error) {
      console.error('error beforeAll @ GET /grantcycle/findbyname/:name', error);
    }
    return grants;
  });
  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error afterEach @ GET /grantcycle/findbyname/:name', error);
    }
  });

  it('returns 200 && grant cycle', (done) => {
    const { name } = testGrant;
    request(app)
      .get(`/grantcycle/findbyname/${name}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        // checks for the keys of res.body to be included in a new instance of GrantCycle
        // couldn't figure how to do this with only object comparison and keep it in one line
        expect(Object.keys(res.body))
          .toEqual(expect.arrayContaining(Object.keys(new db.GrantCycle(testGrant).dataValues)));
        if (error) {
          console.log(res.text);
          console.error('error @ GET /grantcycle/findbyname/:name', error);
          return done(error);
        }
        done();
      });
  });
  it('returns 404 if grant by name does not exist', (done) => {
    const name = 'non-existent grant';
    request(app)
      .get(`/grantcycle/findbyname/${name}`)
      .set('Content-Type', 'application/json')
      .end((error, res) => {
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({});
        if (error) {
          console.log(res.text);
          console.error('error @ GET /grantcycle/findbyname/:name', error);
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
  it('returns 200 && active grant', (done) => {
    request(app)
      .get('/grantcycle/findactive')
      .end((error, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
        expect(res.body.isActive).toBe(true);
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findactive', error);
          return done(error);
        }
        done();
      });
  });
  it('returns 404 if no active grants', async (done) => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.error('error @ GET /grantcycle/findactive', error.message);
    }
    request(app)
      .get('/grantcycle/findactive')
      .end((error, res) => {
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({});
        if (error) {
          console.log(res.text);
          console.error('error @ POST /grantcycle/findbyname', error);
          return done(error);
        }
        done();
      });
  });
});
