'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations', 'hipaaReminderEmailTimestamp', {
        type:Sequelize.DATE,
      }),
      queryInterface.addColumn('nominations', 'awaitingHipaaReminderEmailTimestamp', {
        type:Sequelize.DATE,
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'hipaaReminderEmailTimestamp'),
      queryInterface.removeColumn('nominations', 'awaitingHipaaReminderEmailTimestamp')
    ]);
  },
};
