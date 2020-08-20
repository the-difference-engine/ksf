'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Nomination extends Model {};

  Nomination.init({
    id: DataTypes.UUIDV4,
    status: DataTypes.STRING,
    dateReceived: DataTypes.DATE,
    providerFirstName: DataTypes.STRING,
    providerLastName: DataTypes.STRING,
    providerNumber: DataTypes.INTEGER,
    emailAddress: DataTypes.STRING,
    title: DataTypes.STRING,
    validated: DataTypes.BOOLEAN,
    hospitalName: DataTypes.STRING,
    hospitalURL: DataTypes.STRING,
    hospitalAddress: DataTypes.STRING,
    hospitalCity: DataTypes.STRING,
    hospitalState: DataTypes.STRING,
    hospitalZipCode: DataTypes.INTEGER,
    representativeFirstName: DataTypes.STRING,
    representativeLastName: DataTypes.STRING,
    representativeEmailAddress: DataTypes.STRING,
    relationship: DataTypes.STRING,
    patientFirstName: DataTypes.STRING,
    patientLastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    admissionDate: DataTypes.DATE,
    dischargeDate: DataTypes.DATE,
    patientDiagnosis: DataTypes.STRING,
    amountRequested: DataTypes.INTEGER,
    amountGranted: DataTypes.INTEGER,
    attachmentsDestination: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nomination',
  });
  return Nomination;
};