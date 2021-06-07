'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations','reminderSent', {
        type:Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations','reminderSent',),
    ]);
  },
};
