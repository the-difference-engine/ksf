const { google } = require('googleapis');
const keys = require('./keys.json');

// const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
//   'https://www.googleapis.com/auth/spreadsheets',
// ]);

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
    spreadsheetId: '1iHh5t7RMsYo7gOzsy_4tHYXztMB-2onb6svEf13EJBs',
    range: 'Sheet1!A1:b2',
  };

  let data = await gsapi.spreadsheets.values.get(opt);

  console.log(data.data.values);
}
