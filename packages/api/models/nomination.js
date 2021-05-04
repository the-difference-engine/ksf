'use strict';
const { sendVerification } = require('../helper/mailer.js');
const creds = require('../config/config.json').credentials;
const { Model, Sequelize, DataTypes } = require('sequelize');
const publicEmailDomains = [
  'gmail.com',
  'aol.com',
  'outlook.com',
  'zoho.com',
  'mail.com',
  'yahoo.com',
  'protonmail.com',
  'icloud.com',
];

module.exports = (sequelize, DataTypes) => {
  class Nomination extends Model {
    static associate(models) {
      Nomination.associate = function (models) {
        Nomination.belongsTo(models.GrantCycle, {
          foreignKey: 'grantCycleId',
          as: 'GrantCycle',
        });
      };
    }
  }

  Nomination.init(
    {
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'received',
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      dateReceived: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      providerName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerPhoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerEmailAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emailValidated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hospitalName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      hospitalURL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hospitalAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      hospitalCity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hospitalState: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hospitalZipCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      representativeName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      representativeEmailAddress: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'unknown',
      },
      representativePhoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      representativeRelationship: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      patientName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      patientAge: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      admissionDate: DataTypes.DATE,
      dischargeDate: DataTypes.STRING,
      patientDiagnosis: DataTypes.TEXT,
      amountRequestedCents: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amountGrantedCents: DataTypes.INTEGER,
      attachmentsDestination: DataTypes.TEXT,
      publicEmailDomain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationCode: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      representativeSpanishRequested: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      referralOrigination: {
        type: DataTypes.TEXT,
      },
      hipaaTimestamp: {
        allowNull: true,
        type: DataTypes.DATE
      },
      awaitingHipaaTimestamp: {
        allowNull: true,
        type: DataTypes.DATE
      },
      reminderSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      readyForBoardReviewTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCreate: (nomination, option) => {
          publicEmailDomains.forEach((domain) => {
            if (nomination.providerEmailAddress.includes(domain)) {
              nomination.publicEmailDomain = true;
            }
          });
        },
      },
      sequelize,
      modelName: 'Nomination',
      tableName: 'nominations',
    }
  );

  return Nomination;
};
