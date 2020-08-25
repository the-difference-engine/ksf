'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grantCycle extends Model {}

  grantCycle.init(
    {
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      openedOn: DataTypes.DATE,
      closedOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'grantCycle',
    }
  );
  return grantCycle;
};
