'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('nominations', 'representativeName', {
			type: Sequelize.TEXT,
		});
    await queryInterface.changeColumn('nominations', 'referralOrigination', {
			type: Sequelize.TEXT,
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('nominations', 'representativeName', {
			type: Sequelize.STRING,
		});
    await queryInterface.changeColumn('nominations', 'referralOrigination', {
			type: Sequelize.STRING,
		});
  }
};
