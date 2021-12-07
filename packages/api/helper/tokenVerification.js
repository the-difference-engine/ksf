require('dotenv').config()
const { google } = require('googleapis');

const functions = {
 gValidate: async (authHeader) => {
  const token = authHeader.split(' ')[1].trim();
  const audience_id = authHeader.split(' ')[2].trim();
  const oauth2Client = new google.auth.OAuth2(
   process.env.AUTH_CLIENT_ID,
 );
  const client = await oauth2Client.verifyIdToken({
   idToken: token,
   audience: audience_id
  });

  if(client) return client;
  return false;
 }
}
