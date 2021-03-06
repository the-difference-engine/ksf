'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nominations', 'verificationCode', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('nominations', 'verificationCode');
  },
};
