'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nominations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'received',
      },
      dateReceived: {
        type: Sequelize.DATE,
      },
      providerFirstName: {
        type: Sequelize.STRING,
      },
      providerLastName: {
        type: Sequelize.STRING,
      },
      providerNumber: {
        type: Sequelize.INTEGER,
      },
      emailAddress: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      emailValidated: {
        type: Sequelize.BOOLEAN,
      },
      hospitalName: {
        type: Sequelize.STRING,
      },
      hospitalURL: {
        type: Sequelize.STRING,
      },
      hospitalAddress: {
        type: Sequelize.STRING,
      },
      hospitalCity: {
        type: Sequelize.STRING,
      },
      hospitalState: {
        type: Sequelize.STRING,
      },
      hospitalZipCode: {
        type: Sequelize.STRING,
      },
      representativeFirstName: {
        type: Sequelize.STRING,
      },
      representativeLastName: {
        type: Sequelize.STRING,
      },
      representativeEmailAddress: {
        type: Sequelize.STRING,
      },
      relationship: {
        type: Sequelize.STRING,
      },
      patientFirstName: {
        type: Sequelize.STRING,
      },
      patientLastName: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      admissionDate: {
        type: Sequelize.DATE,
      },
      dischargeDate: {
        type: Sequelize.DATE,
      },
      patientDiagnosis: {
        type: Sequelize.STRING,
      },
      amountRequestedCents: {
        type: Sequelize.INTEGER,
      },
      amountGrantedCents: {
        type: Sequelize.INTEGER,
      },
      attachmentsDestination: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('nominations');
  },
};
