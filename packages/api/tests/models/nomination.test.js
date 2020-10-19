const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

describe('nomination model email validation', () => {
  let nomination;

  afterAll(() => {
    nomination.destroy();
  });

  it('publicEmailDomain is true when nomination is sent from a free public domain', async () => {
    nomination = db.Nomination.build({ emailAddress: 'test@gmail.com' });
    nomination.save();
    expect(nomination.publicEmailDomain).toBe(true);
  });

  it('publicEmailDomain is false when nomination is sent from a private email', async () => {
    nomination = db.Nomination.build({ emailAddress: 'test@thedifferenceengine.io' });
    nomination.save();
    expect(nomination.publicEmailDomain).toBe(false);
  });
});
