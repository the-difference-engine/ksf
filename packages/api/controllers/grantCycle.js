const { Op, ValidationError } = require('sequelize');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const { DateTime } = require('luxon');

const create = async (req, res) => {
  try {
    const grant = await db.GrantCycle.create(req.body);
    return res.status(201).json(grant);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.info('400 at POST /grantcycle', error);
      return res.status(400).send(error.message);
    }
    console.error('500 error at POST /grantcycle', error);
    return res.status(500).send('Something went wrong. Please try again');
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Missing Grant cycle ID');
  }
  const { name, openedOn, closedOn, isActive } = req.body;
  try {
    const grant = await db.GrantCycle.findByPk(id);

    if (!grant) {
      return res.status(404).send('Grant does not exist for the given ID');
    }

    const previousActiveGrant = await db.GrantCycle.update(
      { isActive: false },
      { where: { isActive: true } }
    );

    const openedOnDate = new Date(openedOn);

    const closedOnDate = new Date(closedOn);

    openedOnDayLater = DateTime.fromJSDate(openedOnDate).plus({ days: 1 });
    closedOnDayLater = DateTime.fromJSDate(closedOnDate).plus({ days: 1 });

    let openedOnDateString = openedOnDayLater.toISO();

    let closedOnDateString = closedOnDayLater.toISO();

    if (name) grant.name = name;
    if (openedOn) grant.openedOn = openedOnDateString;
    if (closedOn) grant.closedOn = closedOnDateString;
    console.log(openedOnDateString);
    console.log(closedOnDateString);
    grant.isActive = isActive;
    await grant.save();
    return res.status(200).send(grant);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.info('400 error at PUT /grantcycle', error);
      return res.status(400).send(error.message);
    }
    console.error('500 error at PUT /grantcycle', error);
    return res.status(500).send('Something went wrong. Please try again');
  }
};

const findAll = async (req, res) => {
  try {
    const grants = await db.GrantCycle.findAll({
      order: [['openedOn', 'DESC']],
      raw: true,
    });
    if (grants.length) {
      const result = await Promise.all(
        grants.map(async (g) => {
          try {
            const openedOn = new Date(g.openedOn);

            const closedOn = new Date(g.closedOn);

            openedOnDayLater = DateTime.fromJSDate(openedOn).plus({ days: 1 });
            closedOnDayLater = DateTime.fromJSDate(closedOn).plus({ days: 2 });

            let openedOnDateString = openedOnDayLater.toISODate();

            let closedOnDateString = closedOnDayLater.toISODate();

            const nominations = await db.Nomination.findAll({
              where: {
                [Op.and]: [
                  {
                    readyForBoardReviewTimestamp: {
                      [Op.between]: [openedOnDateString, closedOnDateString],
                    },
                    [Op.or]: [
                      { status: 'Ready for Board Review' },
                      { status: 'Declined' },
                    ],
                  },
                ],
              },
              order: [['readyForBoardReviewTimestamp', 'DESC']],
            });

            g.nominations = nominations;
          } catch (error) {
            console.log(error);
            return res.status(404).send(error);
          }
        })
      );
      return res.status(200).json(grants);
    }

    return res.status(404).send('No grants found');
  } catch (error) {
    console.error('500 error at GET /grantcycle/findall', error);
    return res.status(500).send('Something went wrong. Please try again');
  }
};

const findByName = async (req, res) => {
  const name = decodeURI(req.params.name);
  try {
    const grant = await db.GrantCycle.findOne({ where: { name } });
    if (grant) {
      return res.status(200).json(grant);
    }
    return res.status(404).send(`No grant cycle found with name: ${name}`);
  } catch (error) {
    console.error('500 error at POST /grantcycle/findbyname', error);
    return res.status(500).send(error.message);
  }
};

const findActive = async (req, res) => {
  try {
    const grant = await db.GrantCycle.findOne({ where: { isActive: true } });
    if (grant) {
      return res.status(200).json(grant);
    }
    return res.status(404).send('No active grant cycles found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  findAll,
  findByName,
  update,
  findActive,
};
