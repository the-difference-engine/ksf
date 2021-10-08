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
  async function authenticate() {
    return new Promise((resolve, reject) => {
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      const authServer = http
        .createServer(async (req, res) => {
          try {
            console.log('HERE IS THE URL', req.url);
            if (await req.url.indexOf('/?code') > -1) {
              const qs = await new url.URL(req.url, `http://localhost:${PORT}`)
                .searchParams;
              res.end('Authentication successful! Please return to the console. Redirecting...');
              authServer.destroy();
              const { tokens } = await oauth2Client.getToken(qs.get('code'));
              oauth2Client.credentials = tokens;
              resolve(oauth2Client);
              await getNewDocs(oauth2Client);
            } else {
              console.log('Authentication Error, could not create server');
            }
          } catch (error) {
            reject(error);
          }
        })
        .listen(PORT, () => {
          opn(authorizeUrl, { wait: true, newInstance: false }).then((cp) => cp.unref());
        });
      destroyer(authServer);
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
              } else {
                console.log('no attachments found');
              }
            });
          });
        } else {
          console.log('No labels found.');
        }
      });
    }
    opn(`http://localhost:${PORT}/`);
  }
  authenticate();
}

module.exports = gmailStart;
