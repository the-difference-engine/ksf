const { google } = require('googleapis');
const parentFolderId = '1Uu04G0GGvJVaYE0S9hvc9_6lmtN5XQtQ'

const credentials = require('../env/credentials.json');

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file'
];

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });

function createFolder(applicationName) {
  let fileMetadata = {
    'name': applicationName,
    'parents': [parentFolderId],
    'mimeType': 'application/vnd.google-apps.folder'
  };
  drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    }
  })
}

// uncomment to list files
// drive.files.list({}, (err, res) => {
//   if (err) throw err;
//   const files = res.data.files;
//   if (files.length) {
//     files.map((file) => {
//       console.log(file);
//     });
//   } else {
//     console.log('No files found');
//   }
// });

module.exports = { createFolder }