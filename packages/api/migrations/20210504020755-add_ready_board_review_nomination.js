'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('nominations', 'readyForBoardReviewTimestamp', {
        type: Sequelize.DATE
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('nominations', 'readyForBoardReviewTimestamp')
    ])
  }
};
