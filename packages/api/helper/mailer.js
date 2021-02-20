const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
const generateToken = require('./generateToken');
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

const email = new emailTemplate({
  transport: transporter,
  send: true,
  preview: true,
});

function verifyHcEmail(nomination) {
  const email = String(nomination.providerEmailAddress);
  const emailToken = generateToken(email);
  email.send({
    template: 'verifyHcEmail',
    message: {
      from: 'formmaster@keepswimmingfoundation.org',
      to: nomination.providerEmailAddress,
    },
    locals: {
      name: nomination.providerName,
      urlLink: `${process.env.APP_URL}/confirmation/${emailToken}`
    }
  }).then(() => console.log('email has been sent!'))
    .catch(console.error);
}

module.exports = {
  verifyHcEmail
}
