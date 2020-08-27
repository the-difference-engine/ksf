'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrantCycle extends Model {}

  GrantCycle.init(
    {
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      openedOn: DataTypes.DATE,
      closedOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'GrantCycle',
    }
  );
  return GrantCycle;
};
