const { validate: uuidValidate } = require('uuid');
const sequelize = require('sequelize');
const { ValidationError, where } = require('sequelize');
const db = require('../models');
const { sendSurveyEmail } = require('../helper/mailer');
const { createFolder } = require('../helper/googleDrive');
const states = require('../../app/node_modules/us-state-codes/index');
const { sendDeclineEmail } = require('../helper/mailer');
const { verifyHcEmail } = require('../helper/mailer');
const { sendSurveyReminder } = require('../helper/mailer');
const { sendHIPAAReminder } = require('../helper/mailer');
const { sendHIPAAEmail } = require('../helper/mailer');
const { sendHIPAAProvider } = require('../helper/mailer');
const { sendSurveySocialWorker } = require('../helper/mailer');
const gsheetToDB = require('../helper/nominationGsheetToDB');
const jwt = require('jsonwebtoken');
const { drive } = require('googleapis/build/src/apis/drive');
const Op = sequelize.Op;
const { google } = require('googleapis');
const parsePrivateKey = require('../helper/parsePrivateKey');
const { resolveContent } = require('nodemailer/lib/shared');
const parentFolderId = process.env.APPLICATION_FOLDER_ID;
const clientEmail = process.env.SERVICE_CLIENT_EMAIL;
const privateKey = parsePrivateKey(process.env.SERVICE_PRIVATE_KEY);
const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
];

const auth = new google.auth.JWT(clientEmail, null, privateKey, scopes);

const driveFolder = google.drive({ version: 'v3', auth });

const NOMINATION_STATUS = {
  received: 'received',
  awaiting: 'Awaiting HIPAA',
  verified: 'HIPAA Verified',
  document_review: 'Document Review',
  board_review: 'Ready for Board Review',
  declined: 'Declined',
};

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
const findAllNominations = async (req, res) => {
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
        nom.providerEmailAddress === providerEmailAddress && nom.emailValidated
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

const resendEmail = async (req, res) => {
  const { id } = req.params;
  const { recipient, emailType } = req.body;
  try {
    const nomination = await db.Nomination.findOne({
      where: { id },
    });
    console.log(
      `email sent to: ${recipient.replace('-', ' ')}`,
      `email type sent: ${emailType}`
    );
    if (recipient === 'family-member' && emailType === 'hipaa') {
      sendHIPAAEmail(nomination);
    } else if (recipient === 'family-member' && emailType === 'survey') {
      sendSurveyEmail(nomination);
    } else if (recipient === 'healthcare-provider' && emailType === 'hipaa') {
      sendHIPAAProvider(nomination);
    } else if (recipient === 'healthcare-provider' && emailType === 'survey') {
      sendSurveySocialWorker(nomination);
    } else {
      return res.status(400).json({
        error: `invalid input, email for ${recipient} and ${emailType} unknown`,
      });
    }
  } catch {
    console.log('500 Internal Server Error', error);
    return res.status(500).json({ error: error.message });
  }
};

const updateNomination = async (req, res) => {
  const { id } = req.params;
  try {
    const nomination = await db.Nomination.findOne({
      where: { id },
    });
    const response = nomination
      .update({ status: req.body.status })
      .catch((err) => {
        console.log('Nomination Not Found', err);
        return res.status(400);
      });
    //can continue using additional conditional to use other email functions,
    //depending on status of application
    //current nominations don't have decline status, that should come after nominations hit ready for board review. TBD
    if (nomination.changed('status')) {
      if (nomination.status === NOMINATION_STATUS.declined) {
        try {
          nomination.update({ declinedTimestamp: Date() });
        } catch (error) {
          console.log(
            'Error declining nomination. Could not record readyForBoardReviewTimestamp ',
            error
          );
        } finally {
          sendDeclineEmail(nomination);
        }
      }

      if (nomination.status === NOMINATION_STATUS.awaiting) {
        try {
          nomination.update({ awaitingHipaaTimestamp: Date() });
          const lastName = nomination.patientName
            ? nomination.patientName.split(' ')[1]
            : '';
          const state = states.getStateCodeByStateName(
            nomination.hospitalState
          );

          const applicationName = `${lastName}-${state}`;
          let driveFolderId = await createFolder(applicationName, nomination);
          // console.log(`This is driveId from createFolder call: ${driveId}`);
          console.log(
            `!!!!!This is driveFolderId in nomination: ${driveFolderId}`
          );

          nomination.update({ driveFolderId: driveFolderId });

          return res.status(200).json(driveFolderId, nomination.status);
        } catch (err) {
          console.error('Could not create a folder', err);
        } finally {
          sendHIPAAEmail(nomination);
          sendHIPAAProvider(nomination);
        }
      }

      if (nomination.status === NOMINATION_STATUS.verified) {
        try {
          nomination.update({ hipaaTimestamp: Date() });
          return res.status(200).json(nomination.status);
        } catch (err) {
          console.log('Nomination Not Found', err);
          return res.status(400);
        } finally {
          sendSurveyEmail(nomination);
          sendSurveySocialWorker(nomination);
        }
      }

      if (nomination.status === NOMINATION_STATUS.board_review) {
        try {
          const grant = await db.GrantCycle.findOne({
            where: { isActive: true },
          });

          nomination.update({
            readyForBoardReviewTimestamp: Date(),
            grantCycleId: grant.id,
          });
          return res.status(200).json(nomination.status);
        } catch (error) {
          console.log('Could not record readyForBoardReviewTimestamp ', error);
        }
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
const emailVerification = async (req, res) => {
  try {
    const { token } = req.params;
    const { data: id } = jwt.verify(token, process.env.JWT_SECRET);
    await db.Nomination.update({ emailValidated: true }, { where: { id } });
    return res.status(204).end();
  } catch (error) {
    console.log('400 validation error', error);
    return res.status(400).json({ error: error.message });
  }
};
/**
 * Updates database with information from active application updates on front end.
 *
 * @param {*} req - updated props data object
 * @param {*} res - response code
 */

const updateActiveNomData = async (req, res) => {
  const { id } = req.params;
  try {
    const nomination = await db.Nomination.findOne({
      where: { id },
    });

    await nomination.update(
      { ...req.body },
      {
        where: { id },
      }
    );
    return res.status(200).json({ message: 'updated' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

async function searchAndSend(status, query) {
  const nominations = await db.Nomination.findAll(query);
  let nomination;
  for (let i = 0; i < nominations.length; i++) {
    nomination = nominations[i];
    switch (status) {
      case 'HIPAA Verified':
        sendSurveyReminder(
          nomination.representativeEmailAddress,
          nomination.representativeName
        );
        sendSurveyReminder(
          nomination.providerEmailAddress,
          nomination.providerName
        );
        try {
          nomination.update({ hipaaReminderEmailTimestamp: Date() });
        } catch (err) {
          console.log('Unable to update record hipaa reminder timestamp', err);
        }
        break;
      case 'Awaiting HIPAA':
        sendHIPAAReminder(
          nomination.representativeEmailAddress,
          nomination.representativeName
        );
        sendHIPAAReminder(
          nomination.providerEmailAddress,
          nomination.providerName
        );
        try {
          nomination.update({ awaitingHipaaReminderEmailTimestamp: Date() });
        } catch (err) {
          console.log(
            'Unable to update record awaiting hipaa reminder timestamp',
            err
          );
        }
        break;
      default:
        console.log(status, ' is not a status');
    }
  }
}
module.exports = {
  getNominationById,
  findAllNominations,
  createNomination,
  updateNomination,
  syncNominations,
  updateActiveNomData,
  emailVerification,
  searchAndSend,
  resendEmail,
};
