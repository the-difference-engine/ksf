const { Nomination } = require('../models');

const getNomiationById = async (req, res) => {
  try {
    const nomination = await Nomination.create(req.body);
    return res.status(201).json({
      nomination,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { getNomiationById }
