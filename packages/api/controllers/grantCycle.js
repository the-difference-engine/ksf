const { Op, ValidationError } = require('sequelize');
const db = require('../models');
const dateHelper = require('../helper/dateHelpers');
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

    if (name) grant.name = name;
    if (openedOn) grant.openedOn = openedOn;
    if (closedOn) grant.closedOn = closedOn;
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
      console.log(`grants length ${grants.length}`);
      const result = await Promise.all(
        grants.map(async (g) => {
          try {
            // const openedOnDate = dateHelper.setOpenedOnDate(g.openedOn);
            // const closedOnDate = dateHelper.setClosedOnDate(g.closedOn);

            // console.log(openedOnDate);
            // console.log(closedOnDate);
            const openedOn = new Date(g.openedOn);
            // const closedOn = new Date(
            //   new Date(g.closedOn).getTime() + 60 * 60 * 24 * 1000
            // );
            const closedOn = new Date(g.closedOn);
            // openedOn.setHours(0, 0, 0, 0);
            // closedOn.setHours(0, 0, 0, 0);
            // const dateFormatted = openedOn
            //   .toLocaleDateString()
            //   .replace('/', '-');
            // var options = { hour12: false };
            // const timeFormatted = openedOn
            //   .toLocaleString('en-US', options)
            //   .split(', ')[1];
            // const stringFormatted = `${dateFormatted} ${timeFormatted}.000 +00:00`;

            // const dateFormatted2 = closedOn
            //   .toLocaleDateString()
            //   .replace('/', '-');
            // var options = { hour12: false };
            // const timeFormatted2 = closedOn
            //   .toLocaleString('en-US', options)
            //   .split(', ')[1];
            // const stringFormatted2 = `${dateFormatted2} ${timeFormatted2}.000 +00:00`;

            // TODO: somersbmatthews and taylork
            // 1.) try with date object like here: https://stackoverflow.com/a/43127894/9312505
            // 2.) make it work with the way the date has a timezone in the db
            // 3.) if 1 and 2 fail try raw sql query with date function from postgresql date/time docs

            // https://moment.github.io/luxon/#/formatting

            openedOnDayLater = DateTime.fromJSDate(openedOn).plus({ days: 1 });
            closedOnDayLater = DateTime.fromJSDate(closedOn).plus({ days: 2 });

            let openedOnDateString = openedOnDayLater.toISODate();

            let closedOnDateString = closedOnDayLater.toISODate();

            // https://stackoverflow.com/a/23336010
            let sqlQueryForDateRange =
              'SELECT * FROM nominations WHERE "readyForBoardReviewTimestamp" >=  \'' +
              openedOnDateString +
              '\' AND "readyForBoardReviewTimestamp" <= \'' +
              closedOnDateString +
              "'";

            //sequelize.org/master/manual/raw-queries.html
            //google doc for the problem this raw query attempts to solve: docs.google.com/document/d/19WcCXwYqv0bzpTnwTPZS6-qHR0JVYI7fvIBFIHODGzs/edit?usp=sharing
            const sequelize = db.Nomination.sequelize;
            const nominations = await sequelize.query(sqlQueryForDateRange, {
              // // A function (or false) for logging your queries
              // // Will get called for every SQL query that gets sent
              // // to the server.
              // logging: console.log,

              // // If plain is true, then sequelize will only return the first
              // // record of the result set. In case of false it will return all records.
              // plain: false,

              // // Set this to true if you don't have a model definition for your query.
              // raw: false,

              // The type of query you are executing. The query type affects how results are formatted before they are passed back.
              type: QueryTypes.SELECT,

              model: db.Nomination,
              mapToModel: true, // pass true here if you have any mapped fields
            });

            // const nominations = await db.Nomination.findAll({
            //   where: {
            //     [Op.and]: [
            //       {
            //         readyForBoardReviewTimestamp: {
            //           [Op.between]: [g.openedOn, g.closedOn],
            //         },
            //         [Op.or]: [
            //           { status: 'Ready for Board Review' },
            //           { status: 'Declined' },
            //         ],
            //       },
            //     ],
            //   },
            //   order: [['readyForBoardReviewTimestamp', 'DESC']],
            // });
            g.nominations = nominations;
            // if (g.name === '18-19') {
            //   console.log('OPENED ON');
            //   console.log(stringFormatted);
            //   console.log('CLOSED ON');
            //   console.log(stringFormatted2);
            //   for (i = 0; i < nominations.length; i++) {
            //     if (
            //       nominations[i].id === 'dc1b8a88-8ace-418b-ac98-c71ff593bc38'
            //     ) {
            //       console.log('ID IS HERE');
            //     }
            //   }
            // }
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
