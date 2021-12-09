const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
const { generateToken } = require('./generateToken');

const imgUrl = process.env.IMG_BASE_URL ?? process.env.APP_URL;
const adminEmail = 'Bill <bill@keepswimmingfoundation.org>';
const formmasterEmail = 'formmaster@keepswimmingfoundation.org';
const infoEmail = 'Keep Swimming Foundation <info@keepswimmingfoundation.org>';
const previewStatus = process.env.PREVIEW_EMAILS ? JSON.parse(process.env.PREVIEW_EMAILS) : false;
const states = require('../../app/node_modules/us-state-codes/index');

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
  // send status will eventually need to be updated to true
  preview: previewStatus,
});

const recEmail = (nomEmail) => {
  if (process.env.RECIPIENT_EMAIL != null && process.env.RECIPIENT_EMAIL.length > 0) {
    return process.env.RECIPIENT_EMAIL;
  }
  return nomEmail;
};

function sendDeclineEmail(nomination) {
  email
    .send({
      template: 'decline',
      message: {
        from: formmasterEmail,
        to: recEmail(nomination.representativeEmailAddress),
      },
      locals: {
        name: nomination.providerName,
        patientName: nomination.patientName,
        imgUrl,
      },
    })
    .catch((err) => console.log(err))
    .then(() => console.log('email has been sent!'));
}

function sendSurveyEmail(nomination) {
  const lastName = nomination.patientName
    ? nomination.patientName.split(' ')[1]
    : '';
  email.send({
    template: 'survey',
    attachments: './survey/header.jpg',
    message: {
      from: adminEmail,
      to: recEmail(nomination.representativeEmailAddress),
    },
    locals: {
      name: nomination.representativeName,
      patientName: nomination.patientName,
      email: nomination.representativeEmailAddress,
      lastName: lastName,
      hospitalState:  states.getStateCodeByStateName(
        nomination.hospitalState,
      ),
      hospitalCity: nomination.hospitalCity,
      imgUrl,
    },
  }).catch((err) => console.log(err))
    .then(() => console.log('email has been sent!'));
}

function verifyHcEmail(nomination) {
  const emailToken = generateToken(nomination.id);
  email
    .send({
      template: 'verifyHcEmail',
      message: {
        from: formmasterEmail,
        to: recEmail(nomination.providerEmailAddress),
      },
      locals: {
        name: nomination.providerName,
        urlLink: `${process.env.APP_URL}/email-verification/${emailToken}`,
        imgUrl,
      },
    })
    .catch(console.error);
}

function sendHIPAAEmail(nomination) {
  const lastName = nomination.patientName
    ? nomination.patientName.split(' ')[1]
    : '';
  email
    .send(
      {
        template: 'hipaa',
        message: {
          from: infoEmail,
          replyTo: infoEmail,
          to: recEmail(nomination.representativeEmailAddress),
        },
        locals: {
          name: nomination.representativeName,
          lastName,
          hospitalCity: nomination.hospitalCity,
          hospitalState: states.getStateCodeByStateName(
            nomination.hospitalState,
          ),
          imgUrl,
        },
      },
    )
    .then(() => console.log('email has been sent!'))
    .catch((err) => console.log(err));
}

function sendSurveyReminder(emailAddress, fullName) {
  email
    .send(
      {
        template: 'surveyReminder',
        message: {
          from: infoEmail,
          replyTo: infoEmail,
          to: recEmail(emailAddress),
        },
        locals: {
          name: fullName,
          imgUrl,
        },
      },
    )
    .catch((err) => console.log(err));
}

function sendHIPAAReminder(emailAddress, fullName) {
  email
    .send(
      {
        template: 'hipaaReminder',
        message: {
          from: infoEmail,
          replyTo: infoEmail,
          to: recEmail(emailAddress),
        },
        locals: {
          name: fullName,
          imgUrl,
        },
      },
    )
    .catch((err) => console.log(err));
}

function sendHIPAAProvider(nomination) {
  email
    .send(
      {
        template: 'hipaaProvider',
        message: {
          from: infoEmail,
          replyTo: infoEmail,
          to: recEmail(nomination.providerEmailAddress),
        },
        locals: {
          name: nomination.patientName,
          providerName: nomination.providerName,
        },
      },
    )
    .then(console.log('the provider has been notified about HIPAA Authorization process'))
    .catch((err) => console.log(err));
}

function sendSurveySocialWorker(nomination) {
  email
    .send({
      template: 'surveySocialWorker',
      message: {
        from: formmasterEmail,
        to: recEmail(nomination.providerEmailAddress),
      },
      locals: {
        name: nomination.providerName,
        patientName: nomination.patientName,
        imgUrl,
      },
    })
    .then(() => console.log('email has been sent!'))
    .catch((err) => console.log(err));
}

module.exports = {
  sendDeclineEmail,
  sendSurveyEmail,
  verifyHcEmail,
  sendHIPAAEmail,
  sendHIPAAReminder,
  sendSurveyReminder,
  sendHIPAAProvider,
  sendSurveySocialWorker,
};
