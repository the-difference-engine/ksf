const fs = require('fs');
const readline = require('readline')
const {google} = require('googleapis');

const SCOPES = ['http://www.googleapis.com/auth/gmail.readonly'];

const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
  if(err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listLabels)
})

function authorize(credentials, callback) {
  console.log(credentials, credentials.installed, 'HEYYYYYY')
  const {client_secret, client_id, redirect_uri} = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if(err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if(err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if(err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      });
      callback(oAuth2Client);
    })
  })
}

const listLabels = (auth) => {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if(err) return console.log('The API returned an error:' +err);
    const labels = res.data.labels;
    if(labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      })
    } else {
      console.log('No labels found');
    }
  });
}
module.exports = {listLabels};
