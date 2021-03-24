'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const generateRandomNoms = () => {
      let providerFN = faker.name.firstName();
      let providerLN = faker.name.lastName();
      const arrayOfDictNom = []
      for(let i = 0; i <= 100; i++) {
        arrayOfDictNom.append({
          id: faker.random.uuid(),
          status: 'received',
          dateReceived: new Date(),
          providerName: `${providerFN} ${providerLN}`,
          providerPhoneNumber: faker.phone.phoneNumber(),
          providerEmailAddress: `${providerFN}${providerLN}@provider.com`,
          providerTitle: 'Dock',
          emailValidated: true,
          hospitalName: 'Northwestern',
          hospitalURL: faker.internet.url(),
          hospitalAddress: faker.address.streetAddress(),
          hospitalCity: faker.address.city(),
          hospitalState: faker.address.state(),
          hospitalZipCode: faker.address.zipCode(),
          representativeFirstName: faker.name.firstName(),
          representativeLastName: faker.name.lastName(),
          representativeEmailAddress: `${providerFN}${providerLN}@representative.com`,
          relationship: 'representative',
          patientFirstName: faker.name.firstName(),
          patientLastName: faker.name.lastName(),
          age: Math.floor(Math.random() * 100),
          admissionDate: faker.date.past(),
          dischargeDate: faker.date.past(),
          patientDiagnosis: faker.lorem.sentence(),
          amountRequestedCents: faker.finance.amount(),
          amountGrantedCents: faker.finance.amount(),
          attachmentsDestination: faker.lorem.sentence(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          grantCycleId: faker.random.uuid(),
        });
      }
      return arrayOfDictNom;
    }
    return queryInterface.bulkInsert(
      'nominations', generateRandomNoms())
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('nominations', null, {});
  }
};
