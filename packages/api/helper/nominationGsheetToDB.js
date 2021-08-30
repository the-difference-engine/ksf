const { google } = require('googleapis');
const db = require('../models');
const parsePrivateKey = require('./parsePrivateKey');
const rangePar = 'Sheet1';
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const privateKey = parsePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY)
const scopes = ['https://www.googleapis.com/auth/spreadsheets']

module.exports = function gsheetToDB() {
  const client = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    scopes
  );

  client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to google sheets API!');
      getRawNominationData(client);
    }
  });

  async function getRawNominationData(cl) {
    let data;
    const gsapi = google.sheets({ version: 'v4', auth: cl });

    const opt = {
      spreadsheetId: process.env.SPREADSHEET_ID_PARAMETER,
      range: rangePar,
    };

    try {
      data = await gsapi.spreadsheets.values.get(opt);
    } catch (error) {
      console.error(error);
      return;
    }

    let nominations = data.data.values;

    nominations.slice(1).forEach((nomination) => {
      try {
        db.Nomination.findOrCreate({
          where: {
            dateReceived: nomination[0],
            providerName: nomination[10],
            providerPhoneNumber: nomination[11],
            providerEmailAddress: nomination[12],
            providerTitle: nomination[13],
            hospitalName: nomination[18],
            hospitalURL: nomination[19],
            hospitalAddress: nomination[20],
            hospitalCity: nomination[21],
            hospitalState: nomination[22],
            hospitalZipCode: nomination[23],
            representativeName: nomination[24],
            representativeEmailAddress: nomination[25],
            representativePhoneNumber: nomination[26],
            representativeRelationship: nomination[27],
            patientName: nomination[29],
            patientAge: nomination[30],
            admissionDate: nomination[31],
            dischargeDate: nomination[32],
            patientDiagnosis: nomination[34],
            grantRequestInfo: nomination[35],
            amountRequestedCents: parseInt(
              parseFloat(nomination[37].replace(/\$/g, '')) * 100
            ),
          },
        });
      } catch (error) {
        console.error(error);
      }
    });

    return nominations;
  }
};
