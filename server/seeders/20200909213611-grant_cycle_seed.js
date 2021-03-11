'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'grant_cycles',
      [
        {
          id: 'db49080a-c1d6-42e0-b0f3-7667bf4fdd1f',
          name: 'Spring 2019',
          isActive: false,
          openedOn: '2019-03-31',
          closedOn: '2019-06-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '87224c5b-075d-4a43-9518-eeed0edbf5cd',
          name: 'Fall 2019',
          isActive: false,
          openedOn: '2019-10-01',
          closedOn: '2019-12-15',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2c680ecb-8e7d-43e0-84ca-a11ee28f22ac',
          name: 'Spring 2020',
          isActive: false,
          openedOn: '2020-03-28',
          closedOn: '2020-06-17',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2c5be8d2-ced1-4008-8b13-9ffdbfe39e97',
          name: 'Fall 2020',
          isActive: true,
          openedOn: '2020-08-28',
          closedOn: '2020-11-17',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grant_cycles', null, {});
  },
};
