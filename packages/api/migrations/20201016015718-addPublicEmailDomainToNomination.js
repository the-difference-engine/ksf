'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('nominations', 'publicEmailDomain', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('nominations', 'publicEmailDomain');
  },
};
