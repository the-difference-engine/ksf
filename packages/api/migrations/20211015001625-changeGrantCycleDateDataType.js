'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('grant_cycles', 'openedOn', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn('grant_cycles', 'closedOn', {
      type: Sequelize.DATEONLY,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('grant_cycles', 'openedOn', {
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('grant_cycles', 'closedOn', {
      type: Sequelize.DATE,
    });
  },
};
