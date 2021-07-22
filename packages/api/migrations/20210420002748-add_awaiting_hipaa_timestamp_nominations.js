'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations','awaitingHipaaTimestamp', {
        type:Sequelize.DATE,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations','awaitingHipaaTimestamp',),
    ]);
  },
};