'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.removeColumn('nominations', 'dateReceived'),
      queryInterface.removeColumn('nominations', 'providerFirstName'),
      queryInterface.removeColumn('nominations', 'providerLastName'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.addColumn('nominations', ' dateReceived', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('nominations', ' providerFirstName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', ' providerLastName', {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
