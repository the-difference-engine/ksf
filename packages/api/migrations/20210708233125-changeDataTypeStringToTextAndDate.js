'use strict';
const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
<<<<<<< HEAD
      `ALTER TABLE nominations ALTER COLUMN "dischargeDate" SET DATA TYPE date USING case when length("dischargeDate") > 8 then to_date("dischargeDate", 'yyyy-mm-dd') else to_date("dischargeDate",'mm/dd/yy') end`
=======
      `ALTER TABLE nominations ALTER COLUMN "dischargeDate" SET DATA TYPE date USING to_date("dischargeDate", 'mm/dd/yyyy')`
>>>>>>> 0f3c3adc89d76d2f7f2c8d5df9100cb6cf92ed8f
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE nominations ALTER COLUMN "admissionDate" SET DATA TYPE date`
    );
    await queryInterface.changeColumn('nominations', 'status', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'providerName', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'providerPhoneNumber', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'providerEmailAddress', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'providerTitle', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'hospitalURL', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'hospitalCity', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'hospitalState', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'hospitalZipCode', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn(
      'nominations',
      'representativeEmailAddress',
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      'nominations',
      'representativePhoneNumber',
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn(
      'nominations',
      'representativeRelationship',
      {
        type: Sequelize.TEXT,
      }
    );
    await queryInterface.changeColumn('nominations', 'patientName', {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('nominations', 'patientAge', {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('nominations', 'status', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'providerName', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'providerPhoneNumber', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'providerEmailAddress', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'providerTitle', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'hospitalURL', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'hospitalCity', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'hospitalState', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'hospitalZipCode', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn(
      'nominations',
      'representativeEmailAddress',
      {
        type: Sequelize.STRING,
      }
    );
    await queryInterface.changeColumn(
      'nominations',
      'representativePhoneNumber',
      {
        type: Sequelize.STRING,
      }
    );
    await queryInterface.changeColumn(
      'nominations',
      'representativeRelationship',
      {
        type: Sequelize.STRING,
      }
    );
    await queryInterface.changeColumn('nominations', 'patientName', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('nominations', 'patientAge', {
      type: Sequelize.STRING,
    });
  },
};
