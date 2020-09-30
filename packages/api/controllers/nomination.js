const { validate: uuidValidate } = require('uuid');
const db = require('../models');

const getNominationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!uuidValidate(id)) {
      return res.status(400).send('Provided ID is not a valid UUID');
    }

    const nomination = await db.Nomination.findByPk(id);

    if (nomination) {
      return res.status(200).json({ nomination });
    }
    return res
      .status(404)
      .send('Nomination with the specified ID does not exist!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createNomination = async (req, res) => {
  try {
    const nomination = await db.Nomination.create(req.body);

    return res.status(201).json({
      woohoo: 'nom created',
      nomination,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getNominationById, createNomination };
