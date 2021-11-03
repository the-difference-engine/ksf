'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('domains', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.bulkInsert('domains', [
      { id: Sequelize.UUIDV4, name: 'gmail.com' },
      { id: Sequelize.UUIDV4, name: 'aol.com' },
      { id: Sequelize.UUIDV4, name: 'outlook.com' },
      { id: Sequelize.UUIDV4, name: 'zoho.com' },
      { id: Sequelize.UUIDV4, name: 'mail.com' },
      { id: Sequelize.UUIDV4, name: 'yahoo.com' },
      { id: Sequelize.UUIDV4, name: 'protonmail.com' },
      { id: Sequelize.UUIDV4, name: 'icloud.com' }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('domains');
  },
};
