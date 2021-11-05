'use strict';
const { DateTime } = require('luxon');

const {
  Model,
  Sequelize,
  DataTypes,
  ValidationError,
  Op,
} = require('sequelize');

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
          if (instance.openedOn >= instance.closedOn)
            throw new ValidationError('openedOn must be before closedOn');

          if (instance.isActive) {
            try {
              const activeGrant = await GrantCycle.findOne({
                where: { isActive: true },
              });
              if (activeGrant && instance.id !== activeGrant.id) {
                throw new ValidationError(
                  `Active grant already exists: ${activeGrant.name}`
                );
              }
            } catch (error) {
              if (error instanceof ValidationError) {
                throw error;
              }
              throw new Error('something went wrong on validation');
            }
          }

          try {
            const openedOn = new Date(instance.openedOn);
            const closedOn = new Date(instance.closedOn);

            let openedOnDayLater = DateTime.fromJSDate(openedOn);
            // .plus({ days: 1 });
            let closedOnDayLater = DateTime.fromJSDate(closedOn);
            // .plus({ days: 1 });

            let openedOnDateString = openedOnDayLater.toISO();

            let closedOnDateString = closedOnDayLater.toISO();

            const result = await GrantCycle.findAll({
              where: {
                [Op.and]: [
                  {
                    id: {
                      [Op.not]: [instance.id],
                    },
                  },
                  {
                    [Op.or]: [
                      {
                        openedOn: {
                          [Op.between]: [
                            openedOnDateString,
                            closedOnDateString,
                          ],
                        },
                      },
                      {
                        closedOn: {
                          [Op.between]: [
                            openedOnDateString,
                            closedOnDateString,
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            });
            if (result.length) {
              throw new ValidationError(
                'Dates overlap with existing grant cycle'
              );
            }
          } catch (error) {
            throw error;
          }
          return instance;
        },
      },
      sequelize,
      modelName: 'GrantCycle',
      tableName: 'grant_cycles',
    }
  );
  return GrantCycle;
};
