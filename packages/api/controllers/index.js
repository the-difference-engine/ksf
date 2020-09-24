const db = require('../models');
const { validate: uuidValidate } = require('uuid');

const getNominationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      return res.status(404).send('Nomination with the specified ID does not exist!');
    }

    const nomination = await db.Nomination.findByPk(id);

    if (nomination) {
      return res.status(200).json({ nomination });
    }
    return res.status(404).send('Nomination with the specified ID does not exist!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getNominationById }
