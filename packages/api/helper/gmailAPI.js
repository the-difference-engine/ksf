const opn = require('open');
const { google } = require('googleapis');
const { credentials } = require('./credentials');

function gmailStart() {
  const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_CLIENT_ID,
    process.env.AUTH_CLIENT_SECRET,
    credentials.installed.redirect_uris[0],
  );
  google.options({ auth: oauth2Client });

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  opn(authorizeUrl, { wait: true, newInstance: false }).then((cp) => cp.unref());
}

module.exports = gmailStart;
