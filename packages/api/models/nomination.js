'use strict';
const publicEmailDomains = ['gmail.com', 'aol.com', 'outlook.com', 'zoho.com', 'mail.com', 'yahoo.com', 'protonmail.com', 'icloud.com'];
const { Model } = require('sequelize');
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
      dateReceived: DataTypes.DATE,
      providerName: DataTypes.STRING,
      providerPhoneNumber: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      providerTitle: DataTypes.STRING,
      emailValidated: DataTypes.BOOLEAN,
      hospitalName: DataTypes.STRING,
      hospitalURL: DataTypes.STRING,
      hospitalAddress: DataTypes.STRING,
      hospitalCity: DataTypes.STRING,
      hospitalState: DataTypes.STRING,
      hospitalZipCode: DataTypes.STRING,
      representativeFirstName: DataTypes.STRING,
      representativeLastName: DataTypes.STRING,
      representativeEmailAddress: DataTypes.STRING,
      representativePhoneNumber: DataTypes.STRING,
      representativeRelationship: DataTypes.STRING,
      patientName: DataTypes.STRING,
      patientAge: DataTypes.INTEGER,
      admissionDate: DataTypes.DATE,
      dischargeDate: DataTypes.DATE,
      patientDiagnosis: DataTypes.STRING,
      amountRequestedCents: DataTypes.INTEGER,
      amountGrantedCents: DataTypes.INTEGER,
      attachmentsDestination: DataTypes.STRING,
      publicEmailDomain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: (nomination, option) => {
          publicEmailDomains.forEach((domain) => {
            if (nomination.emailAddress.includes(domain)) {
              nomination.publicEmailDomain = true;
            }
          });
        },
      },
      sequelize,
      modelName: 'Nomination',
      tableName: 'nominations',
    },
  );
  return Nomination;
};
