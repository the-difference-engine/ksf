'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('grant_cycles', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_name_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('grant_cycles', 'unique_name_constraint');
  },
};
