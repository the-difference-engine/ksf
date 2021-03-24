const { google } = require('googleapis');
const fs = require('fs');
var fileMetadata = {
      'name': 'BIGTest',
      'mimeType': 'application/vnd.google-apps.folder'
    };

const credentials = require('../env/credentials.json');

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });
MakeaFolder()
drive.files.list({}, (err, res) => {
  if (err) throw err;
  const files = res.data.files;

  if (files.length) {
    files.map((file) => {
      
      console.log(file);
    });
  } else {
    console.log('No files found');
    MakeaFolder()
  }
});
function MakeaFolder(){drive.files.create({
  resource: fileMetadata,
  fields: 'id'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  }
})}

(async function () {

  let res = await drive.files.list({
    pageSize: 20,
    fields: 'files(name,fullFileExtension,webViewLink)',
    orderBy: 'createdTime desc'
  });




})()
