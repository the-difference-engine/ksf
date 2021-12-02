module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('nominations', 'attachments', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,

    }),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('nominations', 'attachments'),
  ]),
};
