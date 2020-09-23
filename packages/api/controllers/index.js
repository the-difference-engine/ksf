const db = require('../models');

const getNominationById = async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await db.Nomination.findByPk(id);
    // TODO Logic to check if ID is valid UUID before sending 500?
    // console.log(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id));
    if (nomination) {
      return res.status(200).json({ nomination });
    }
    return res.status(404).send('Nomination with the specified ID does not exist!');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { getNominationById }
