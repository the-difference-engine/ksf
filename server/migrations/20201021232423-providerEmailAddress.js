'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'nominations',
      'emailAddress',
      'providerEmailAddress'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'nominations',
      'providerEmailAddress',
      'emailAddress'
    );
  },
};
