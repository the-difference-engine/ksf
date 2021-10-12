const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');
const { google } = require('googleapis');
const stream = require('stream');
const credentials = require('./credentials.json');
const parsePrivateKey = require('./parsePrivateKey');
const env = require('./env.json');

const clientEmail = env.service_client_email;
const privateKey = parsePrivateKey(env.service_private_key);
const PORT = 3000;

const scopesDrive = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
];
const auth = new google.auth.JWT(
  clientEmail, null,
  privateKey, scopesDrive,
);

const drive = google.drive({ version: 'v3', auth });

async function uploadFile(nomName, img) {
  const query = `name = '${nomName}'`;
  drive.files.list({
    q: query,
    fields: 'files(id)',
  }, (err, res) => {
    if (err || !res.data.files[0]) {
      console.log(err, 'No files found.');
    } else {
      const folderId = res.data.files[0].id;
      const imgToSend = img;
      const buf = new Buffer.from(imgToSend, 'base64');
      const bs = new stream.PassThrough();
      bs.end(buf);
      const media = {
        body: bs,
      };
      const fileMetadata = {
        name: 'Attachment',
        parents: [folderId],
      };
      drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id',
      }, (err, file) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}
function gmailStart() {
  const { getAwaitingHipaa } = require('../controllers/nomination');
  const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
  const oauth2Client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0],
  );
  google.options({ auth: oauth2Client });

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('AUTHORIZE URL:', authorizeUrl);

  opn(authorizeUrl, { wait: true, newInstance: true }).then((cp) => cp.unref());
}

module.exports = gmailStart;
