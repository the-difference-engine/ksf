'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('nominations', 'reminderSent');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nominations', 'reminderSent', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
  }
};
