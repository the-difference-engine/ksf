const { Op, ValidationError } = require('sequelize');
const db = require('../models');

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
  const {
    name, openedOn, closedOn, isActive,
  } = req.body;
  try {
    const grant = await db.GrantCycle.findByPk(id);

    if (!grant) {
      return res.status(404).send('Grant does not exist for the given ID');
    }

    if (name) grant.name = name;
    if (openedOn) grant.openedOn = openedOn;
    if (closedOn) grant.closedOn = closedOn;
    if (isActive != null) grant.isActive = isActive;
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
    const grants = await db.GrantCycle.findAll({ order: [['openedOn', 'DESC']], raw: true });
    if (grants.length) {
      const result = await Promise.all(grants.map(async (g) => {
        try {
          const nominations = await db.Nomination.findAll({ 
            where: {
              [Op.and]: [{
                // change 'dateReceived' to 'readyForBoardReviewTimestamp'
                readyForBoardReviewTimestamp: {
                  [Op.between]: [g.openedOn, g.closedOn]
                },
                status: {
                  [Op.eq]: 'Ready for Board Review'
                }
              }]
            }
          , order: [
            ['dateReceived', 'DESC' ]
          ]});
          g.nominations = nominations;
        }
        catch (error) {
          return res.status(404).send(error);
        }
      }));
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
