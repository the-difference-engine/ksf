const { google } = require('googleapis');
const db = require('../models');
const rangePar = 'Sheet1';

module.exports = function gsheetToDB() {
  const client = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Connected to google sheets API!');
      getRawNominationData(client);
    }
  });

  async function getRawNominationData(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });

    const opt = {
      spreadsheetId: process.env.SPREADSHEET_ID_PARAMETER,
      range: rangePar,
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let nominations = data.data.values;

    nominations.forEach((nomination, index) => {
      if (index !== 0) {
        console.log(nomination[1]);

        db.Nomination.create({
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
          amountRequestedCents: parseInt(nomination[37].replace(/\$/g, '')),
        });
      }
    });

    return data.data.values;
  }
};
