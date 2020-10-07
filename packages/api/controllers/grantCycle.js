const db = require('../models');

const createGrantCycle = async (req, res) => {
  try {
    const grant = await db.GrantCycle.create({ ...req.body });
    if (grant) {
      return res.status(201).json(grant);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { createGrantCycle };
