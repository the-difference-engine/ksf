'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('nominations', [{
      pid: '',
      status: '',
      dateReceived: '',
      providerFirstName: '',
      providerLastName: '',
      providerNumber: '',
      emailAddress: '',
      title: 'R',
      emailValidated: true,
      hospitalName: '',
      hospitalURL: '',
      hospitalAddress: '',
      hospitalCity: '',
      hospitalState: '',
      hospitalZipCode: '',
      representativeFirstName: '',
      representativeLastName: '',
      representativeEmailAddress: '',
      relationship: '',
      patientFirstName: '',
      patientLastName: '',
      age: 11,
      admissionDate: '',
      dischargeDate: '',
      patientDiagnosis: '',
      amountRequestedCents: 1,
      amountGrantedCents: 11,
      attachmentsDestination: '',
      createdAt: '',
      updatedAt: '',
      grantCycleId: '',
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('nominations', null, {
     id: 'b5a27641-d76b-4ab0-9cef-8bf9eb9e8fab',
     status: 'received',
     dateReceived: new Date(),
     providerFirstName: 'ProviderFirstName1',
     providerLastName: 'ProviderLastName1',
     providerNumber: 5550001,
     emailAddress: 'provideremail1@email.com',
     title: 'RN',
     emailValidated: true,
     hospitalName: 'hospital 1',
     hospitalURL: 'hospital1Url.com',
     hospitalAddress: 'Hospital Address 1',
     hospitalCity: 'Hospital City 1',
     hospitalState: 'Hospital State 1',
     hospitalZipCode: '11111',
     representativeFirstName: 'RepresentativeFirstName1',
     representativeLastName: 'RepresentativeLastName1',
     representativeEmailAddress: 'representativeEmailAddress1@email.com',
     relationship: 'Parent',
     patientFirstName: 'PatientFirstname1',
     patientLastName: 'PatientLastname1',
     age: 11,
     admissionDate: '2019-01-01',
     dischargeDate: '2019-01-11',
     patientDiagnosis: 'Diagnosis Strings should be returned',
     amountRequestedCents: 100000,
     amountGrantedCents: 100001,
     attachmentsDestination: 'https://www.google.com/',
     createdAt: new Date(),
     updatedAt: new Date(),
     grantCycleId: 'db49080a-c1d6-42e0-b0f3-7667bf4fdd1f',
  });
}
};
