const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
const { generateToken } = require('./generateToken');
const imgUrl = process.env.IMG_BASE_URL ?? process.env.APP_URL
const adminEmail = 'Bill <bill@keepswimmingfoundation.org>';

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
  preview: false,
});

function sendDeclineEmail(nomination) {
  email.send({
    template: 'decline',
    message: {
      from: adminEmail,
      to: nomination.providerEmailAddress,
    },
    locals: {
      name: nomination.providerName,
      patientName: nomination.patientName,
      imgUrl
    }
  }).catch((err) => console.log(err)).then(() => console.log('email has been sent!'));
}

function sendSurveyEmail(nomination) {
  email.send({
    template: 'survey',
    attachments: './survey/header.jpg',
    message: {
      from: adminEmail,
      to: nomination.representativeEmailAddress
    },
    locals: {
      name: nomination.representativeName,
      patientName: nomination.patientName,
      email: nomination.representativeEmailAddress,
      imgUrl
    }
  }).catch((err) => console.log(err))
  .then(() => console.log('email has been sent!'));
}


function verifyHcEmail(nomination) {
  const emailToken = generateToken(nomination._id);
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
  const todaysDate = new Date();
  const monthDate = todaysDate.getMonth() + 1;
  const targetQuarter = monthDate < 4 ? 1 : monthDate > 3 && monthDate < 7 ? 2 : monthDate > 6 && monthDate < 10 ? 3 : 4;


  email
    .send(
      {
        template: 'hipaa',
        message: {
          from: 'Keep Swimming Foundation <info@keepswimmingfoundation.org>',
          replyTo: 'info@keepswimmingfoundation.org',
          to: nomination.representativeEmailAddress,
        },
        locals: {
          name: nomination.patientName,
          imgUrl,
          targetQuarter,
        },
      }
    )
    .then(() => console.log('email has been sent!'))
    .catch((err) => console.log(err))
}

function sendSurveyReminder(nomination) {
  email
    .send(
      {
        template: 'surveyReminder',
        message: {
          from: 'Keep Swimming Foundation <info@keepswimmingfoundation.org>',
          replyTo: 'info@keepswimmingfoundation.org',
          to: nomination.providerEmailAddress,
        },
        locals: {
          name: nomination.patientName,
          providerName: nomination.providerName,
          imgUrl
        }
      }
    )
    .then(console.log("reminder email has been sent to" + nomination.providerName))
    .catch((err) => console.log(err))
}

function sendHIPAAReminder(nomination) {
  email
    .send(
      {
        template: 'hipaaReminder',
        message: {
          from: 'Keep Swimming Foundation <info@keepswimmingfoundation.org>',
          replyTo: 'info@keepswimmingfoundation.org',
          to: nomination.providerEmailAddress,
        },
        locals: {
          name: nomination.patientName,
          providerName: nomination.providerName,
          imgUrl
        }
      }
    )
    .then(console.log("reminder email has been sent to" + nomination.providerName))
    .catch((err) => console.log(err))
}

module.exports = {
  sendDeclineEmail,
  sendSurveyEmail,
  verifyHcEmail,
  sendHIPAAEmail,
  sendHIPAAReminder,
  sendSurveyReminder
};

