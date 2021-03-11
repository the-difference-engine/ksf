const request = require('supertest');
const app = require('../../server');
const db = require('../../models');
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
  representativeName: 'Alfred Pennyworth',
  representativeEmailAddress: 'abeagle@dc.com',
  representativePhoneNumber: '222-222-2222',
  representativeRelationship: 'Butler',
  patientName: 'Bruce Wayne',
  patientAge: '18 Years of age or older',
  amountRequestedCents: 20000,
};

describe('nomination model email validation', () => {
  let nomination;

  afterEach(() => {
    nomination.destroy();
  });

  it('publicEmailDomain is true when nomination is sent from a free public domain', async () => {
    nomination = await db.Nomination.create(nominationData);
    expect(nomination.publicEmailDomain).toBe(true);
  });

  it('publicEmailDomain is false when nomination is sent from a private email', async () => {
    nomination = await db.Nomination.create(
      nominationData,
      (nominationData.providerEmailAddress =
        'thedifferenceengine@thedifferenceengine.io')
    );
    expect(nomination.publicEmailDomain).toBe(false);
  });
});
