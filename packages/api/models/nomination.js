const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Nomination = sequelize.define('Nomination', {
  // Model attributes are defined here
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateReceived: {
    type: DataTypes.DATETIME
    // allowNull defaults to true
  },
  providerFirstName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  providerLastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  providerNumber: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  emailAddress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  title: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  validated: {
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  },
  hospitalName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  hospitalURL: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  hospitalAddress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  hospitalCity: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  hospitalState: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  hospitalZipCode: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  representativeFirstName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  representativeLastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  representativeEmailAddress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  relationship: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  patientFirstName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  patientLastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  Age: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  admissionDate: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  dischargeDate: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  patientDiagnosis: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  amountRequested: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  amountGranted: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  attachmentsDestination: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
// `sequelize.define` also returns the model
console.log(Nomination === sequelize.models.Nomination); // true

module.exports = Nomination;