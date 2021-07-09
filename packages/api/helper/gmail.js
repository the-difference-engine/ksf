const {google} = require('googleapis');
const parsePrivateKey = require('./parsePrivateKey');
const privateKey = parsePrivateKey(process.env.SERVICE_PRIVATE_KEY);
const clientEmail = process.env.SERVICE_CLIENT_EMAIL;
const scopes = ['https://www.googleapis.com/auth/gmail.readonly']
const auth = new google.auth.JWT(
  clientEmail, null,
  privateKey, scopes
);
// const gmail = google.gmail({version: 'v1', auth});
const gmail = google.gmail({version: 'v1', auth});
async function getMessages(user_id) {
  try {
    let messages = await gmail.users.messages.list({
      userId: 'me'
    });
    console.log(messages);
  } catch (error) {
    console.log(error, 'U FUCKED UP')
  }
}
module.exports = { getMessages };