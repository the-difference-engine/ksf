'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grant_Cycle extends Model {}

  Grant_Cycle.init(
    {
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      openedOn: DataTypes.DATE,
      closedOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Grant_Cycle',
    }
  );
  return Grant_Cycle;
};
