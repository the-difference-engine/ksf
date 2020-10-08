const db = require('../models');

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
const update = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send('Missing id input');
  }

  const { id, name, openedOn, closedOn } = req.body;
  try {
    const grant = await db.GrantCycle.findByPk(id);
    if (grant) {
      if (name) grant.name = name;
      if (openedOn) grant.openedOn = openedOn;
      if (closedOn) grant.closedOn = closedOn;
      grant.save();
      /*
      memo: check for any cycles that are active
      */
      return res.status(204).json(grant);
    }
    return res.status(404).send('Grant does not exist');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const grant = await db.GrantCycle.create({ ...req.body });
    // memo: what if grant is falsy?
    // would this get caught by the 500 handler?
    if (grant) {
      return res.status(201).json(grant);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { create, findAll, findByName, update };
