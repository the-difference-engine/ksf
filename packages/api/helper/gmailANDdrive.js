'use strict';
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');
const credentials = require('./credentials.json');
// const {getAwaitingHipaa} = require('../controllers/nomination');
const { google } = require('googleapis');
const parsePrivateKey = require('./parsePrivateKey');
const stream = require('stream');
const env = require('./env.json')
const parentFolderId = env.application_folder_id;
const clientEmail = env.service_client_email;
const privateKey = parsePrivateKey(env.service_private_key)
const fs = require('fs');
const PORT = 3000;
const { gmail } = require('googleapis/build/src/apis/gmail');
const scopesDrive = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file'
];
const auth = new google.auth.JWT(
  clientEmail, null,
  privateKey, scopesDrive
);
console.log(clientEmail);
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
      console.error(err);
    }
  })
}
async function uploadFile(applicationName, img) {
  let query = `name = '${applicationName}'`;
  drive.files.list({
    q: query,
    fields: 'files(id)',
  }, function(err, res) {
    if(err || !res.data.files[0]) {
      console.log(err, 'No files found.');
    } else {
      let folderId = res.data.files[0].id;
      console.log('folderId:', res.data.files[0].id);
     let imgToSend = img;
      const buf = new Buffer.from(imgToSend, 'base64');
      const bs = new stream.PassThrough();
      bs.end(buf);
      const media = {
        body: bs
      }
      let fileMetadata = {
        'name': 'Attachment',
        parents: [folderId]
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function(err, file) {
        if(err) {
          console.log(err)
        } else {
          console.log('File Id', file.id);
        }
      })
    }
  });
}
function gmailStart() {
  console.log("Starting GMAIL API feature...");
  const {getAwaitingHipaa} = require('../controllers/nomination');
  const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
  const oauth2Client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  );
  google.options({ auth: oauth2Client });
  async function authenticate() {
    console.log('authenticating....');
    return new Promise((resolve, reject) => {
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      const authServer = http
        .createServer(async (req, res) => {
          console.log('HELLO', req.url)
          try {
            if (await req.url.indexOf('/?code') > -1) {
              const qs = await new url.URL(req.url, `http://localhost:${PORT}`)
                .searchParams;
              res.end('Authentication successful! Please return to the console. Redirecting...');
              authServer.destroy();
              const {tokens} = await oauth2Client.getToken(qs.get('code'));
              console.log(tokens);
              oauth2Client.credentials = tokens;
              resolve(oauth2Client);
              listLabels(oauth2Client);
            } else {
              console.log('Authentication Error, could not create server');
            }
          } catch (error) {
            reject(error)
          }
        })
        .listen(PORT, () => {
          opn(authorizeUrl, { wait: true, newInstance: false }).then((cp) => cp.unref());
        });
      destroyer(authServer);
    });
  }
  async function listLabels(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    let query = '';
    let appNames = await getAwaitingHipaa();

    if(!appNames) {
      console.log('No Applications Currently Awaiting HIPAA')
    } else {
    appNames.forEach((application) =>
      query+= `subject:'${application}'`
    )
      query+= 'AND is:unread';
    gmail.users.messages.list({
      userId: 'me',
      q: `{${query}}`
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ', err);
      const { messages } = res.data;
      if(!messages) {
        console.log('no messages')
      } else {
      if (messages.length) {
        const messageIds = [];
        messages.forEach((message) => {
          let applicationName;
         const id = message.id
          messageIds.push(id)
          const attachmentIds = [];
          gmail.users.messages.get({
            userId: 'me',
            id: message.id,
          }, (err, res) => {
            if(err) return console.log('error retrieving message', err)
            if(res.data.payload.headers) {
                for(let i = 0; i < res.data.payload.headers.length; i++) {
                    if(res.data.payload.headers[i].name === 'Subject') {
                      let confirmSenderEmail = (goal, applicationNames) => {
                        let toReturn;
                        applicationNames.forEach((app) => {
                          if(goal.includes(app)) {
                            toReturn = app
                          }
                        })
                        return toReturn;
                    }
                   let returned = confirmSenderEmail(res.data.payload.headers[i].value, appNames);
                        if(returned) {
                          applicationName = returned
                        }
                    }
                }
            }
            if(res.data.payload.parts.length >= 1) {
              for(let i = 0; i < res.data.payload.parts.length; i++) {
                if(res.data.payload.parts[i].body.attachmentId) {
                  attachmentIds.push(res.data.payload.parts[i].body.attachmentId)
                }
              }
            }
            if(attachmentIds.length > 0) {
              attachmentIds.forEach((attachmentId) => {
                gmail.users.messages.attachments.get({
                userId: 'me',
                messageId: message.id,
                id: attachmentId,
              }, (err, res) => {
                if(err) return console.log('hey', err)
                let markAsRead = function (messageId) {
                gmail.users.messages.modify({
                  'userId': 'me',
                  'id': messageId,
                  'resource': {
                    'removeLabelIds': ['UNREAD']
                    }
                  }, function(err) {
                      if(err) {
                        console.log(err, 'Failed to mark email as read!')
                      } else {
                        console.log('Email marked as Read!')
                        }
                  })
                }
               uploadFile(applicationName, res.data.data)
               markAsRead(message.id);
              })})

            } else {
              console.log('no attachments found')
            }
          });
        })
      } else {
        console.log('No labels found.');
      }}
    });
  }
    opn(`http://localhost:${PORT}/`);
  }
  authenticate();
  // console.log("Calling Authenticate....");
  // let promise = authenticate()
  //   .catch(console.error);
  //   await promise;
  //   console.log(promise);

}
// gmailStart();

module.exports = gmailStart;
