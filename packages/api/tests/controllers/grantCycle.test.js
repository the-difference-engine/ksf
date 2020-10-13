const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

// TODO make test to make sure relations work with Nomination as expected

let testGrant = {
  name: 'test grant',
  openedOn: new Date('2019-01-01'),
  closedOn: new Date('2020-02-02'),
  isActive: true,
};

describe('POST /grantcycle', () => {
  afterEach(async () => {
    testGrant = {
      name: 'test grant',
      openedOn: new Date('2019-01-01'),
      closedOn: new Date('2020-02-02'),
      isActive: true,
    };
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.log('error afterEach on POST /grantcycle', error.message);
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
    testGrant.openedOn = testGrant.closedOn;
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

  it('returns a 400 on missing name', (done) => {
    delete testGrant.name;
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
      console.log('grants\n\n\n\n ', grants);
    } catch (error) {
      console.error('error \n\n\n\n', error);
    }
    return grants;
  });

  afterAll(async () => {
    try {
      await db.GrantCycle.destroy({ where: {} });
    } catch (error) {
      console.log('error afterEach on PUT /grantcycle', error.message);
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
