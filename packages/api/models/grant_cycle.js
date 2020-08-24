'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grant_cycle extends Model {}

  grant_cycle.init(
    {
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      openedOn: DataTypes.DATE,
      closedOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'grant_cycle',
    }
  );
  return grant_cycle;
};
