'use strict';

const { Model, Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrantCycle extends Model {
    static associate(models) {
      GrantCycle.associate = function (models) {
        GrantCycle.hasMany(models.Nomination);
      };
    }
  }

  GrantCycle.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      openedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      closedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
    },
    {
      hooks: {
        beforeSave: (instance) => {
          if (instance.openedOn >= instance.closedOn) throw new Error('openedOn >= closedOn');
          return instance;
        },
      },
      sequelize,
      modelName: 'GrantCycle',
      tableName: 'grant_cycles',
    },
  );
  return GrantCycle;
};
