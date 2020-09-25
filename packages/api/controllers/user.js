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

module.exports = { getUserById };
