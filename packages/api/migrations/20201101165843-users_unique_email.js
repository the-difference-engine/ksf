'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addConstraint('users', {
    fields: ['email'],
    type: 'unique',
    name: 'unique_email_constraint',
  }),

  down: async (queryInterface, Sequelize) => queryInterface.removeConstraint('users', 'unique_email_constraint'),
};
