'use strict';
const { sendVerification } = require('../helper/mailer.js');
const creds = require('../config/config.json').credentials;
const { Model, Sequelize, DataTypes } = require('sequelize');
const db = require('../models');
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
        type: DataTypes.TEXT,
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
        type: DataTypes.TEXT,
      },
      providerPhoneNumber: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      providerEmailAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      providerTitle: {
        allowNull: false,
        type: DataTypes.TEXT,
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
        type: DataTypes.TEXT,
      },
      hospitalAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      hospitalCity: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      hospitalState: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      hospitalZipCode: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      representativeName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      representativeEmailAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: 'unknown',
      },
      representativePhoneNumber: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      representativeRelationship: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      patientName: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      patientAge: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      admissionDate: DataTypes.DATE,
      dischargeDate: DataTypes.DATE,
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
        defaultValue: false,
      },
      referralOrigination: {
        type: DataTypes.TEXT,
      },
      hipaaTimestamp: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      awaitingHipaaTimestamp: {
        allowNull: true,
        type: DataTypes.DATE
      },
      readyForBoardReviewTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
      }, 
      hipaaReminderEmailTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
      },
      awaitingHipaaReminderEmailTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
      },
      grantCycleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      declinedTimestamp: {
        type: DataTypes.DATE,
        allowNull: true
      },
      grantRequestInfo: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCreate: (nomination, option) => {
          const domainList = db.Domain.findAll();
          console.log(domainList);
          publicEmailDomains.forEach(domain => {
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
