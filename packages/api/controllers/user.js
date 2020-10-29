const { validate: uuidValidate } = require('uuid');
const db = require('../models');

const { ValidationError } = require('sequelize');

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      return res.status(400).send('Provided ID is not a valid UUID');
    }

    const user = await db.User.findByPk(id);

    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('User with the specified ID does not exist!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await db.User.create({ username, email });
    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.info('400 error @ POST /user', error);
      return res.status(400).send(error.message);
    }
    console.error(error instanceof Error);
    console.error(error instanceof ValidationError);
    console.error('500 error @ POST /user', error);
    return res.status(500).send('Something went wrong');
  }
};

module.exports = { getUserById, create };
