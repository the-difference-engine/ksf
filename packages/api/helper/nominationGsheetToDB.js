const { google } = require('googleapis');
const db = require('../models');
const rangePar = 'Sheet1';

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
      db.Nomination.create({
        emailAddress: 'test@email.com',
      });
    }
  });

  console.log(data.data.values);
  return data.data.values;
}
