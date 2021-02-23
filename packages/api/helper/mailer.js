const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
const { generateToken } = require('./generateToken');
const previewEmail = require('preview-email');
const path = require('path');

const transport = {
  port: 587,
  secure: false,
  requireTLS: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpTransport(transport));

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

const email = new emailTemplate({
  transport: transporter,
  send: true,
  //send status will eventually need to be updated to true
  preview: true,
});

function sendDeclineEmail(nomination) {
  email.send({
    template: 'decline',
    message: {
      from: 'Bill <bill@keepswimmingfoundation.org>',
      // to: 'sophia@thedifferenceengine.co'
      to: nomination.providerEmailAddress,
    },
    locals: {
      name: nomination.providerName,
      patientName: nomination.patientName,
      appUrl: process.env.APP_URL,
    }
  }.catch((err) => console.log(err))).then(() => console.log('email has been sent!'));
}

function verifyHcEmail(nomination) {
  const id = String(nomination.id);
  const TokenId = generateToken(id);
  email.send({
    template: 'verifyHcEmail',
    message: {
      from: 'formmaster@keepswimmingfoundation.org',
      to: nomination.providerEmailAddress,
    },
    locals: {
      name: nomination.providerName,
      appUrl: process.env.APP_URL,
      urlLink: `${process.env.APP_URL}/confirmation/${TokenId}`
    }
  }).then(() => console.log('email has been sent!'))
    .catch(console.error);
}

module.exports = {
  sendDeclineEmail,
  verifyHcEmail
}
