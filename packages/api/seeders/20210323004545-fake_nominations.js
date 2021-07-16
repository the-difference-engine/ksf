'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const generateRandomNoms = () => {
      const arrayOfDictNom = [];
      for (let i = 0; i <= 100; i++) {
        arrayOfDictNom.push({
          id: faker.datatype.uuid(),
          status: 'received',
          dateReceived: faker.date.past(3, '2021-03-31'),
          providerName: `${faker.name.firstName()}${faker.name.lastName()}`,
          providerPhoneNumber: faker.phone.phoneNumber(),
          providerEmailAddress: `${faker.name.firstName()}${faker.name.lastName()}@provider.com`,
          providerTitle: 'Dock',
          emailValidated: true,
          hospitalName: 'Northwestern',
          hospitalURL: faker.internet.url(),
          hospitalAddress: faker.address.streetAddress(),
          hospitalCity: faker.address.city(),
          hospitalState: faker.address.state(),
          hospitalZipCode: faker.address.zipCode(),
          representativeName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          representativeEmailAddress: `${faker.name.firstName()}${faker.name.lastName()}@representative.com`,
          representativeRelationship: 'representative',
          patientName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          patientAge: Math.floor(Math.random() * 100),
          admissionDate: faker.date.past(),
          dischargeDate: faker.date.past(),
          patientDiagnosis: faker.lorem.sentence(),
          amountRequestedCents: Math.floor(Math.random() * 100),
          amountGrantedCents: Math.floor(Math.random() * 100),
          attachmentsDestination: faker.lorem.sentence(),
          createdAt: new Date(),
          updatedAt: new Date(),
          grantCycleId: 'db49080a-c1d6-42e0-b0f3-7667bf4fdd1f',
        });
      }
      return arrayOfDictNom;
    };
    return queryInterface.bulkInsert('nominations', generateRandomNoms(), {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('nominations', null, {});
  },
};
