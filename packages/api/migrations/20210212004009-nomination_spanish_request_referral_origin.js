'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.addColumn('nominations', 'representativeSpanishRequested', {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      }),
      queryInterface.addColumn('nominations', 'referralOrigination', {
        type: Sequelize.STRING
      }),
     ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'representativeSpanishRequested'),

      queryInterface.removeColumn('nominations', 'referralOrigination'),
    ])
  },
};
