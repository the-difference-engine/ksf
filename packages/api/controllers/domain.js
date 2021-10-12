const { ValidationError } = require('sequelize');
const db = require('../models');

const create = async (req, res) => {
  try {
    db.Domain.create(req.body);
    return res.status(204).end();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('400 validation error', error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  create,
};
