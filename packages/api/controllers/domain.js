const { ValidationError } = require('sequelize');
const db = require('../models');

const create = async (req, res) => {
  try {
    const domain = await db.Domain.create(req.body);
    return res.status(200).json(domain);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('400 validation error', error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const domainList = await db.Domain.findAll();
    return res.status(200).json(domainList);
  } catch (error) {
    if (error) {
      console.log('400 validation error', error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.Domain.update({ name: `${name}` },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json(name);
  } catch (err) {
    if (err) {
      console.log('Update error', err);
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ err: err.message });
  }
};

const deleteDomain = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Domain.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).send('Domain deleted');
  } catch (err) {
    if (err) {
      console.log('Delete error', err);
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ err: err.message });
  }
};

module.exports = {
  create,
  findAll,
  update,
  deleteDomain,
};
