const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const drive = google.drive('v3');
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

async function createFolder() {
  const folderName = "John's first folder"
  var fileMetadata = {
    'name': 'Invoices',
    'mimeType': 'application/vnd.google-apps.folder'
  };
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../env/credentials.json'),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });
  google.options({ auth });

  const response = await drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
  });

  console.log(response.data)
  return response.data

}
if (module === require.main) {
  const fileName = process.argv[2];
  createFolder(fileName).catch(console.error);
}
module.exports = createFolder;