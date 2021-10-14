const opn = require('open');
const { google } = require('googleapis');
const stream = require('stream');
const credentials = require('../helper/credentials.json');
const parsePrivateKey = require('../helper/parsePrivateKey');
const env = require('../helper/env.json');
const { getAwaitingHipaa } = require('./nomination');

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

async function getNewDocs(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  let query = '';
  const nomNames = await getAwaitingHipaa();

  if (!nomNames) {
    console.log('No Nominations Currently Awaiting HIPAA');
  } else {
    nomNames.forEach((nomination) => query += `subject:'${nomination}'`);
    query += 'AND is:unread';
    gmail.users.messages.list({
      userId: 'me',
      q: `{${query}}`,
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ', err);
      const { messages } = res.data;
      if (!messages) {
        console.log('no messages');
      } else if (messages.length) {
        const messageIds = [];
        messages.forEach((message) => {
          let nomName;
          const { id } = message;
          messageIds.push(id);
          const attachmentIds = [];
          gmail.users.messages.get({
            userId: 'me',
            id: message.id,
          }, (err, res) => {
            if (err) return console.log('error retrieving message', err);
            if (res.data.payload.headers) {
              for (let i = 0; i < res.data.payload.headers.length; i++) {
                if (res.data.payload.headers[i].name === 'Subject') {
                  const confirmAwaiting = (goal, nomNames) => {
                    let confirmResults;
                    nomNames.forEach((app) => {
                      if (goal.includes(app)) {
                        confirmResults = app;
                      }
                    });
                    return confirmResults;
                  };
                  const confirmedResults = confirmAwaiting(res.data.payload.headers[i].value, nomNames);
                  if (confirmedResults) {
                    nomName = confirmedResults;
                  }
                }
              }
            }
            if (res.data.payload.parts.length >= 1) {
              for (let i = 0; i < res.data.payload.parts.length; i++) {
                if (res.data.payload.parts[i].body.attachmentId) {
                  attachmentIds.push(res.data.payload.parts[i].body.attachmentId);
                }
              }
            }
            if (attachmentIds.length > 0) {
              attachmentIds.forEach((attachmentId) => {
                gmail.users.messages.attachments.get({
                  userId: 'me',
                  messageId: message.id,
                  id: attachmentId,
                }, (err, res) => {
                  if (err) return console.log(err);
                  const markAsRead = function (messageId) {
                    gmail.users.messages.modify({
                      userId: 'me',
                      id: messageId,
                      resource: {
                        removeLabelIds: ['UNREAD'],
                      },
                    }, (err) => {
                      if (err) {
                        console.log(err, 'Failed to mark email as read!');
                      } else {
                        console.log('Email marked as Read!');
                      }
                    });
                  };
                  uploadFile(nomName, res.data.data);
                  markAsRead(message.id);
                });
              });
            }
          });
        });
      }
    });
  }
  opn(`http://localhost:${PORT}/`);
}

const checkNominations = async (req, res) => {
  try {
    console.log('Calling GmailStart function....');
    const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
    const oauth2Client = new google.auth.OAuth2(
      credentials.installed.client_id,
      credentials.installed.client_secret,
      credentials.installed.redirect_uris[0],
    );

    google.options({ auth: oauth2Client });

    if (req.url.indexOf('?code') > -1) {
      res.end('Authentication successful! Please return to the console. Redirecting...');
      const { tokens } = await oauth2Client.getToken(req.query.code);
      oauth2Client.credentials = tokens;
      getNewDocs(oauth2Client);
    } else {
      console.log('Authentication Error, could not create server');
    }
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { checkNominations };
