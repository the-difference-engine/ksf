const request = require('supertest');
const app = require('../../server');
const db = require('../../models');
const { generateToken } = require('../../helper/generateToken');
const nominationData = {
  dateReceived: '12/01/01',
  providerName: 'Hugo Strange',
  providerPhoneNumber: '111-111-1111',
  providerEmailAddress: 'gotham.general@gmail.com',
  providerTitle: 'Professor',
  hospitalName: 'Gotham General Hospital',
  hospitalURL: 'ggh.com',
  hospitalAddress: '123 Main St.',
  hospitalCity: 'Gotham',
  hospitalState: 'New Jersey',
  hospitalZipCode: '07320',
  emailValidated: true,
  representativeName: 'Alfred Pennyworth',
  representativeEmailAddress: 'abeagle@dc.com',
  representativePhoneNumber: '222-222-2222',
  representativeRelationship: 'Butler',
  patientName: 'Bruce Wayne',
  patientAge: '18 Years of age or older',
  amountRequestedCents: 20000,
};

describe('GET Nomination Endpoint', () => {
  let nomination;
  beforeAll(() => {
    nomination = db.Nomination.build(nominationData);
    return nomination.save();
  });
  afterAll(() => {
    nomination.destroy();
  });
  it('returns a 200 when nomination exist', async () => {
    const res = await request(app).get(`/api/nominations/${nomination.id}`);
    expect(res.statusCode).toBe(200);
  });
  it('return a 404 when nomination does not exist', async () => {
    const res = await request(app).get(
      '/api/nominations/00000000-0000-0000-0000-000000000000'
    );
    expect(res.statusCode).toBe(404);
  });
  it('return a 400 when uuid is not a valid uuid', async () => {
    const res = await request(app).get('/api/nominations/326');
    expect(res.statusCode).toBe(400);
  });
});
describe('GET ALL Nomination Endpoint', () => {
  it('returns a 200 when nominations exist', async () => {
    const nomination = await db.Nomination.build(nominationData);
    await nomination.save();
    const res = await request(app).get(`/api/nominations`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(1);
  });
  it('return a 404 when no nomination exist', async () => {
    await db.Nomination.destroy({ where: {} });
    const res = await request(app).get('/api/nominations');
    expect(res.statusCode).toBe(404);
  });
});
describe('Create Nomination Endpoint', () => {
  let nomination;
  beforeAll(() => {
    nomination = db.Nomination.build(nominationData);
    return nomination.save();
  });
  afterAll(() => {
    nomination.destroy();
  });
  it('returns 400 when field is not valid', async () => {
    const res = await request(app).post('/api/nominations').send();
    expect(res.statusCode).toBe(400);
  });
  it('return 201 when nomination is created', async () => {
    const res = await request(app)
      .post('/api/nominations')
      .send(nominationData);
    expect(res.statusCode).toBe(201);
  });
});
describe('Update Nomination Endpoint', () => {
  let nomination;
  beforeAll(() => {
    nomination = db.Nomination.build(nominationData);
    return nomination.save();
  });
  afterAll(() => {
    nomination.destroy();
  });
  it('returns 400 when update fails', async () => {
    const res = await request(app)
      .put('/api/nominations/invalidID')
      .send({ status: 'test' });
    expect(res.statusCode).toBe(400);
  });
  it('return 201 when nomination is created', async () => {
    const res = await request(app)
      .put(`/api/nominations/${nomination.id}`)
      .send({ status: 'test' });
    expect(res.statusCode).toBe(200);
  });
});

describe('PATCH - updates nomination with edited data', () => {
  let nomination;
  beforeAll(() => {
    nomination = db.Nomination.build(nominationData);
    return nomination.save();
  });
  afterAll(() => {
    nomination.destroy();
  });
  it('returns 400 when update fails', async () => {
    const res = await request(app)
      .patch('/api/nominations/invalidID')
      .send({ error: 'test' });
    expect(res.statusCode).toBe(400);
  });
  it('return 200 when nomination is created', async () => {
    const editedNomination = {
      representativeName: 'New Name',
      representativeEmailAddress: 'newemail@dc.com',
    };
    const newNomination = {
      ...editedNomination,
      ...nominationData,
    };
    await request(app)
      .patch(`/api/nominations/${nomination.id}`)
      .send({ editedNomination })
      .expect(200)
      .then(res => {
        request(app)
          .get(`/api/nominations/${nomination.id}`)
          .expect(newNomination);
      });
  });
});

describe('GET Email Validated Endpoint', () => {
  let nomination;
  beforeAll(() => {
    nomination = db.Nomination.build(nominationData);
    return nomination.save();
  });
  afterAll(() => {
    nomination.destroy();
  });
  it('returns a 302 when token is valid / redirect to frontend email verification page', async () => {
    const emailToken = generateToken(nomination.id);
    const res = await request(app).get(`/api/confirmation/${emailToken}`);
    expect(res.statusCode).toBe(302);
  });

  it('return a 400 when token is not valid', async () => {
    const res = await request(app).get(
      '/api/confirmation/00000000-0000-0000-0000'
    );
    expect(res.statusCode).toBe(400);
  });
});
