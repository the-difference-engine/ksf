const request = require('supertest');
const app = require('../../server');
const db = require('../../models');

describe('The Nomination Model', () => {
  let nomination;

  afterAll(() => {
    nomination.destroy();
  });

  it('flags public domain emails', async () => {
    nomination = db.Nomination.build({ id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab', emailAddress: "test@gmail.com"  });
    nomination.save();
    expect(nomination.publicEmailDomain).toBe(true);
  });
});
