'use strict';

const { Model, Sequelize, DataTypes, ValidationError } = require('sequelize');

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
        unique: {
          args: true,
          msg: 'name already in use!',
        },
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
        beforeSave: async (instance) => {
          if (instance.openedOn >= instance.closedOn) throw new ValidationError('openedOn must be before closedOn');

          if (instance.isActive) {
            try {
              const activeGrant = await GrantCycle.findOne({ where: { isActive: true } });
              if (activeGrant && instance.id !== activeGrant.id) {
                throw new ValidationError(`Active grant already exists: ${activeGrant.name}`);
              }
            } catch (error) {
              if (error instanceof ValidationError) {
                throw error;
              }
              throw new Error('something went wrong on validation');
            }
          }
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
