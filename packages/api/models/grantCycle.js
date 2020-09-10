'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrantCycle extends Model {
    static associate(models) {
      GrantCycle.associate = function (models) {
        GrantCycle.hasMany(models.Nomination, {
          foreignKey: 'grantCycleId',
          as: 'Nomination',
        });
      };
    }
  }

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
