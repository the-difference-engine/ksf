'use strict';

module.exports = {
  up: async (queryInterface, Sequelize, DataTypes) => {
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
      { 
        id: 'bc3cd395-226c-46be-9b80-89c5f1c944db', 
        name: 'gmail.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 'db49080a-c1d6-42e0-b0f3-7667bf4fdd1f', 
        name: 'aol.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '87224c5b-075d-4a43-9518-eeed0edbf5cd', 
        name: 'outlook.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '2c680ecb-8e7d-43e0-84ca-a11ee28f22ac', 
        name: 'zoho.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '2c5be8d2-ced1-4008-8b13-9ffdbfe39e97', 
        name: 'mail.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '9f4319d0-e671-444c-9f17-25dd32c9a563', 
        name: 'yahoo.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 'ba8b8532-31b0-47ba-b22f-b9f5491ac82f', 
        name: 'protonmail.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 'a22651f2-fe4e-45dc-9c7e-1ce29f1313ac', 
        name: 'icloud.com', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('domains');
  },
};
