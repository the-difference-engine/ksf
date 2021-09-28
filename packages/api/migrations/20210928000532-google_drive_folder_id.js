'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations', 'driveFolderId', {
        type: Sequelize.TEXT,
        defaultValue: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'driveFolderId'),
    ]);
  },
};
