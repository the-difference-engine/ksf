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
  email
    .send(
      {
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
        },
      }.catch((err) => console.log(err))
    )
    .then(() => console.log('email has been sent!'));
}

function verifyHcEmail(nomination) {
  const emailAddress = String(nomination.providerEmailAddress);
  const emailToken = generateToken(emailAddress);
  email
    .send({
      template: 'verifyHcEmail',
      message: {
        from: 'formmaster@keepswimmingfoundation.org',
        to: nomination.providerEmailAddress,
      },
      locals: {
        name: nomination.providerName,
        appUrl: process.env.APP_URL,
        urlLink: `${process.env.APP_URL}/confirmation/${emailToken}`,
      },
    })
    .then(() => console.log('email has been sent!'))
    .catch(console.error);
}

function sendHIPAAEmail(nomination) {
  const todaysDate = new Date()
  const currentYear = new Date().getFullYear();
  const firstQuarterStart = new Date(currentYear, '00', '01')
  const firstQuarterEnd = new Date(currentYear, '02', '31')
  const secondQuarterStart = new Date(currentYear, '03', '01')
  const secondQuarterEnd = new Date(currentYear, '05', '30')
  const thirdQuarterStart = new Date(currentYear, '06', '01')
  const thirdQuarterEnd = new Date(currentYear, '08', '30')

  const targetQuarter = (todaysDate > firstQuarterStart && todaysDate < firstQuarterEnd) ? 1 : 
      (todaysDate > secondQuarterStart && todaysDate < secondQuarterEnd) ? 2 : 
      (todaysDate > thirdQuarterStart && todaysDate < thirdQuarterEnd) ? 3 : 4;
  
  email.send({
    template: 'hipaa',
    message: {
      from: 'Keep Swimming Foundation <info@keepswimmingfoundation.org>',
      replyTo: 'info@keepswimmingfoundation.org',
      to: nomination.representativeEmailAddress, 
    },
    locals: {
      name: nomination.patientName,
      appUrl: process.env.APP_URL,
      targetQuarter
    }
  }.catch((err) => console.log(err))).then(() => console.log('email has been sent!'));
}

module.exports = {
  sendDeclineEmail,
  verifyHcEmail,
  sendHIPAAEmail
}
