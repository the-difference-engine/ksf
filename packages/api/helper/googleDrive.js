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

const auth = new google.auth.JWT(clientEmail, null, privateKey, scopes);

const drive = google.drive({ version: 'v3', auth });

async function createFolder(applicationName, nomination) {
  let fileMetadata = {
    name: applicationName,
    parents: [parentFolderId],
    mimeType: 'application/vnd.google-apps.folder',
  };
  let err,
    response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
  return response.data.id;
}

module.exports = { createFolder };
