'use strict';
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
    },
    {
      hooks: {
        beforeCreate: (nomination, option) => {
          console.log("Hello from beforeCreate___________________________________________________________________________________________________");
          console.log(nomination);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(nomination)
          const publicDomains = ['@google.com', '@yahoo.com']
          if (publicDomains.some(domain => nomination.emailAddress.split('@')[1].includes(domain))) {
            // nomination.publicEmailDomain = true;
            console.log('public domain ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
          }
        },
      },
      sequelize,
      modelName: 'Nomination',
      tableName: 'nominations',
    }
  );
  // Nomination.beforeCreate(async (nomination, options) => {
  //   const negEmails =["gmail.com", "aol.com", "outlook.com", "zoho.com", "mail.com", "yahoo.com", "protonmail.com", "icloud.com"];
  //   negEmails.forEach(function(domain){
  //     if(nomination.emailAddress.includes(domain)){
  //       // nomination.emailValidated = false;
  //       // console.log("PUBLIC DOMAIN!!")
  //     }
  //   })
  // });


  return Nomination;
};
