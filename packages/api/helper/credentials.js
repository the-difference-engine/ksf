const credentials = {
  installed: {
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    javascript_origins: [
      'https://localhost:3000',
      'https://ksf-stg.herokuapp.com/',
    ],
  },
};

module.exports = { credentials };
