const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

describe('nomination model email validation', () => {
  let nomination;

  afterAll(() => {
    nomination.destroy();
  });

  it('publicEmailDomain is true when nomination is sent from a free public domain', async () => {
    nomination = await db.Nomination.create({ id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab', emailAddress: 'test@gmail.com' });
    expect(nomination.publicEmailDomain).toBe(true);
  });

  it('publicEmailDomain is false when nomination is sent from a private email',async () => {
    nomination = await db.Nomination.create({ id: 'b5a27641-d76b-4ab0-9abf-8bf9eb9e8fab', emailAddress: 'test@thedifferenceengine.io' });
    expect(nomination.publicEmailDomain).toBe(false);
  });
});

