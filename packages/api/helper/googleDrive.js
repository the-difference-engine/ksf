const { google } = require('googleapis');
const parsePrivateKey = require('./parsePrivateKey');
const parentFolderId = process.env.APPLICATION_FOLDER_ID;
const clientEmail = process.env.SERVICE_CLIENT_EMAIL;
const privateKey = parsePrivateKey(process.env.SERVICE_PRIVATE_KEY);
const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
];
const db = require('../models');

const auth = new google.auth.JWT(clientEmail, null, privateKey, scopes);

const drive = google.drive({ version: 'v3', auth });

function createFolder(applicationName, nomination) {
  let fileMetadata = {
    name: applicationName,
    parents: [parentFolderId],
    mimeType: 'application/vnd.google-apps.folder',
  };
  drive.files.create(
    {
      resource: fileMetadata,
      fields: 'id',
    },
    async function (err, res) {
      console.log(`This is file id: ${res.data.id}`);
      console.log(`This is res.data: ${res.data}`);
      // console.log('this is file', res);
      if (err) {
        // Handle error
        console.error(err);
        console.log(err);
      }
      let driveId = res.data.id;
      // return res.data.id;
      nomination.update({ driveFolderId: driveId });
    }
  );

  return '';
}

module.exports = { createFolder };
