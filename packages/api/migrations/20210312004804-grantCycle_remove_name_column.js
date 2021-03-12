'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('grant_cycles', 'name')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('grant_cycles', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'name already in use!'
        },
        validate: {
          notEmpty: true,
        }
      })
    ]);
  }
};
