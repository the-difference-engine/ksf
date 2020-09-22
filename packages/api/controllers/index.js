const db = require('../models');

const getNomiationById = async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await db.Nomination.findByPk(id);
    if (nomination) {
      return res.status(200).json({ nomination });
    }
    return res.status(404).send('Nomination with the specified ID does not exist!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getNomiationById }
