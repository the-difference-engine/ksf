'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('nominations', 'grantCycleId', {
      type: Sequelize.UUID,
      references: {
        model: 'grant_cycles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('nominations', 'grantCycleId', {
      type: Sequelize.UUID,
      references: {
        model: 'grant_cycles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
};
