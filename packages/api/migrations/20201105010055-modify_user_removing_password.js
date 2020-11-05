'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.removeColumn('users', 'password')
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
      }),
      ])
  }
};
