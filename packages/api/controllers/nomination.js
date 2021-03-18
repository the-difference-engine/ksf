const { validate: uuidValidate } = require('uuid');
const { ValidationError } = require('sequelize');
const db = require('../models');
const { sendDeclineEmail } = require('../helper/mailer')
const { sendSurveyEmail } = require('../helper/mailer')
const { verifyHcEmail } = require('../helper/mailer')
const gsheetToDB = require('../helper/nominationGsheetToDB')


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
    console.error('500 - something is not right', error);
    return res.status(500).send(error.message);
  }
};

const findAllNominataions = async (req, res) => {
  try {
    const nominations = await db.Nomination.findAll();
    if (nominations.length) {
      return res.status(200).json(nominations);
    }
    return res.status(404).send('No nominations found');
  } catch (error) {
    console.error('500 on findAllNominations', error);
    return res.status(500).json({ error: error.message });
  }
};

const createNomination = async (req, res) => {
  try {
    const { providerEmailAddress } = req.body;
    const newNomination = await db.Nomination.create(req.body);
    const nominations = await db.Nomination.findAll();
    const hasProviderBeenValidated = nominations.some((nom) => {
      return (
        nom.providerEmailAddress === providerEmailAddress &&
        nom.emailValidated === true
      );
    });
    if (!hasProviderBeenValidated) {
      verifyHcEmail(newNomination.dataValues);
    }
    return res.status(201).json({ newNomination });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('400 validation error', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

const updateNomination = async (req, res) => {
  const { id } = req.params;
  try {
    const nomination = await db.Nomination.findOne({
      where: { id },
    });
    nomination.update({ status: req.body.status }).catch((err) => {
      console.log('Nomination Not Found', err);
      return res.status(400);
    });
    //can continue using additional conditional to use other email functions,
    //depending on status of application
    //current nominations don't have decline status, that should come after nominations hit ready for board review. TBD
    if (nomination.changed('status')) {
      if (nomination.status === 'Decline') {
        sendDeclineEmail(nomination)
      }
      // if nomination state is 'Document Review' then call the sendSurveyEmail
      if (nomination.status === 'HIPAA Verified') {
        // nomination state is updated no need to redefine variable.
        sendSurveyEmail(nomination)
      }
      return res.status(200).json(nomination);
    } 
  } catch (error) {
    console.log('400 Update Bad Request', error);
    return res.status(400).json({ error: error.message });
  }
};

const syncNominations = async (req, res) => {
  try {
    gsheetToDB();
    console.log('nominations synced successfully');
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error: error.message });
  }
};

const emailVerifiction = async (req, res) => {
  try {
    const {
      nomination: { id },
    } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await db.Nomination.update({ emailValidated: true }, { where: { id } });
  } catch (error) {
    console.log('400 validation error', error);
    return res.status(400).json({ error: error.message });
  }
  return res.redirect('https://www.keepswimmingfoundation.org/');
};

module.exports = {
  getNominationById,
  findAllNominataions,
  createNomination,
  updateNomination,
  syncNominations,
  emailVerifiction,
};
