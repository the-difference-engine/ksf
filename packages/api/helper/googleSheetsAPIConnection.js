const { google } = require('googleapis');

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
    console.log('Connected!');
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: 'v4', auth: cl });

  const opt = {
    spreadsheetId: '1GGtT9THPQZBHJSFcQHNu1mYBOdRLeBHZjTz0B5gcY2U',
    range: 'Sheet1',
  };

  let data = await gsapi.spreadsheets.values.get(opt);

  console.log(data.data.values);
}
