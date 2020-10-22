const { validate: uuidValidate } = require('uuid');
const db = require('../models');

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
  if (!email) {
    return res.status(400).send('Missing email');
  }
  if (!username) {
    return res.status(400).send('Missing username');
  }

  try {
    const [user, created] = await db.User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username, email,
      },
    });
    if (user) {
      if (created) return res.status(201).json({ user }); 
      return res.status(400).send('User already exists!');
    }
    console.info('unknown 400 error @ POST /user');
    return res.status(400).send('Something went wrong');
  } catch (error) {
    console.error('500 error @ POST /user', error);
    return res.status(500).send('Something went wrong');
  }
};

module.exports = { getUserById, create };
