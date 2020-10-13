const db = require('../models');
const { ValidationError } = require('sequelize');

const create = async (req, res) => {
  try {
    if (req.body.isActive) {
      const activeGrant = await db.GrantCycle.findOne({ where: { isActive: true } });
      if (activeGrant) return res.status(400).send(`Active grant already exists: ${activeGrant.name}`);
    }
    const grant = await db.GrantCycle.create({ ...req.body });
    return res.status(201).json(grant);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("400 error at POST /grantcycle/", error);
      return res.status(400).send(error.message);
    }
    console.error("500 error at POST /grantcycle/", error);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

const update = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send('Missing ID input');
  }

  const { id, name, openedOn, closedOn, isActive } = req.body;
  try {
    const [grant, activeGrant] = await Promise.all([
      db.GrantCycle.findByPk(id),
      db.GrantCycle.findOne({
        where: { isActive: true },
      }),
    ]);

    if (!grant) {
      return res.status(404).send('Grant does not exist');
    }

    if (name) grant.name = name;
    if (openedOn) grant.openedOn = openedOn;
    if (closedOn) grant.closedOn = closedOn;
    if (isActive) {
      if (activeGrant) {
        return res.status(400).send(`Active grant already exists: ${activeGrant.name}`);
      }
      grant.isActive = isActive;
    }
    await grant.save();
    return res.status(204).json(grant);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const grants = await db.GrantCycle.findAll();
    return res.status(200).json(grants);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findByName = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Missing name input');
  }

  try {
    const grant = await db.GrantCycle.findOne({ where: { name: req.body.name } });
    return res.status(200).json(grant);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  findAll,
  findByName,
  update,
};
