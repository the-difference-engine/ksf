const opn = require('open');
const { google } = require('googleapis');
const stream = require('stream');
const parsePrivateKey = require('../helper/parsePrivateKey');
const { getAwaitingHipaa } = require('./nomination');

const { credentials } = process.env.NODE_ENV === 'TEST' ? {} : require('../helper/credentials');

const clientEmail = process.env.AUTH_SERVICE_CLIENT_EMAIL;
const privateKey = parsePrivateKey(process.env.AUTH_SERVICE_PVT_KEY);


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

const confirmAwaiting = (goal, nomNames) => {
  let confirmResults;
  nomNames.forEach((app) => {
    if (goal.includes(app)) {
      confirmResults = app;
    }
  });
  return confirmResults;
};

const markAsRead = function (messageId, gmail) {
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
              const { headers } = res.data.payload;
              for (let i = 0; i < headers.length; i++) {
                if (headers[i].name === 'Subject') {
                  const confirmedResults = confirmAwaiting(headers[i].value, nomNames);
                  if (confirmedResults) {
                    nomName = confirmedResults;
                  }
                  break;
                }
              }
            }
            if (res.data.payload.parts.length >= 1) {
             
              getAttachmentIds(res.data.payload.parts, attachmentIds);
            }
            if (attachmentIds.length > 0) {
              attachmentIds.forEach((attachmentId) => {
                gmail.users.messages.attachments.get({
                  userId: 'me',
                  messageId: message.id,
                  id: attachmentId,
                }, (err, res) => {
                  if (err) return console.log(err);
                  uploadFile(nomName, res.data.data);
                  markAsRead(message.id, gmail);
                });
              });
            }
          });
        });
      }
    });
  }
}



const getAttachmentIds = ( parts, attachmentIds) => {
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].body.attachmentId) {
      attachmentIds.push(parts[i].body.attachmentId);
    }
  }
}

const checkNominations = async (req, res) => {
  try {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_CLIENT_ID,
      process.env.AUTH_CLIENT_SECRET,
      credentials.installed.redirect_uris[0],
    );

    google.options({ auth: oauth2Client });

    if (req.url.indexOf('?code') > -1) {
      res.end(`<a href="#" onclick="javascript:window.close();opener.window.focus();" > Close Window</a>
      &nbsp; Authentication successful! `);
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
