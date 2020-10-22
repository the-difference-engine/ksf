'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'representativeFirstName'),
      queryInterface.removeColumn('nominations', 'representativeLastName'),
      queryInterface.addColumn('nominations', 'representativeName', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations', 'representativeFirstName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('nominations', 'representativeLastName', {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('nominations', 'representativeName'),
    ]);
  },
};
