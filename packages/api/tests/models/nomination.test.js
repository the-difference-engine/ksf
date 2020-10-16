const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

describe('nomination model email validation', () => {
  let nomination;

  afterAll(() => {
    nomination.destroy();
  });

  it('makes publicEmailDomain true if nomination originates from public email domain', async () => {
    nomination = db.Nomination.build({ emailAddress: 'test@gmail.com' });
    nomination.save();
    expect(nomination.publicEmailDomain).toBe(true);
  });

  it('makes publicEmailDomain false if nomination originates from non public email domain', async () => {
    nomination = db.Nomination.build({ emailAddress: 'test@thedifferenceengine.io' });
    nomination.save();
    expect(nomination.publicEmailDomain).toBe(true);
  });
});
