'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('nominations', 'hospitalAddress', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'hospitalName', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'patientDiagnosis', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'attachmentsDestination', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'dischargeDate', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('nominations', 'hospitalAddress', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'hospitalName', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'patientDiagnosis', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'attachmentsDestination', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('nominations', 'dischargeDate', {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
