const { google } = require('googleapis');
const parsePrivateKey = require('./parsePrivateKey');
const rangePar = 'Sheet1';
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const privateKey = parsePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY)
const scopes = ['https://www.googleapis.com/auth/spreadsheets']

const client = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  scopes
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
  return data.data.values;
}
