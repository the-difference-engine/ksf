'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'providerFirstName'),
      queryInterface.removeColumn('nominations', 'providerLastName'),
      queryInterface.removeColumn('nominations', 'relationship'),
      queryInterface.removeColumn('nominations', 'patientFirstName'),
      queryInterface.removeColumn('nominations', 'patientLastName'),
      queryInterface.removeColumn('nominations', 'age'),
      queryInterface.removeColumn('nominations', 'providerNumber'),
      queryInterface.addColumn('nominations', 'providerName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'patientName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'representativeRelationship', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'patientAge', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('nominations', 'representativePhoneNumber', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('nominations', 'providerPhoneNumber', {
        type: Sequelize.STRING,
      }),
      queryInterface.renameColumn('nominations', 'title', 'providerTitle'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations', ' providerFirstName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', ' providerLastName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'relationship', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'patientFirstName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'patientLastName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'age', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'providerNumber', {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('nominations', 'providerName'),
      queryInterface.removeColumn('nominations', 'patientName'),
      queryInterface.removeColumn('nominations', 'representativeRelationship'),
      queryInterface.removeColumn('nominations', 'patientAge'),
      queryInterface.removeColumn('nominations', 'representativePhoneNumber'),
      queryInterface.removeColumn('nominations', 'providerPhoneNumber'),
      queryInterface.renameColumn('nominations', 'providerTitle', 'title'),
      queryInterface.addColumn('nominations', 'hipaatimestamp', {type: Sequelize.STRING,}),
    ]);
  },
};
