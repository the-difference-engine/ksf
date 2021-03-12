const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const drive = google.drive('v3');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path')
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

async function createFolder() {
  var fileMetadata = {
    'name': 'Fuck me it finally fucking worked',
    'mimeType': 'application/vnd.google-apps.folder'
  };
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../env/credentials.json'),
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });
  google.options({ auth });

  
await drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', "whatever");
    }
  });
  console.log('Folder Id: ', "whatever");
  return "Folder Id";
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  const fileName = process.argv[2];
  createFolder(fileName).catch(console.error);
}
module.exports = createFolder;
