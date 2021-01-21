const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
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

// module.exports = {
  // sendVerification: (nomination) => {
    // let mailOptions = {
    //   from: 'formmaster@keepswimmingfoundation.org',
    //   to: 'ryan.mansfield@thedifferenceengine.io',
    //   subject: 'test',
    //   text: `email text`,
    // };

    // transporter.sendMail(mailOptions, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     console.log('there was an error, email did not send');
    //   } else {
    //     console.log(data)
    //     console.log('email sent!');
    //     console.log('res.originalMessage', res.originalMessage);
    //   }
    // })

  // },
// };

const email = new emailTemplate({
  transport: transporter,
  send: true,
  preview: true,
});

function sendDeclineEmail(nomination) {

//   console.log(nomination)
  email.send({
    template: 'decline',
    message: {
      from: 'Bill <bill@keepswimmingfoundation.org>',
      to: 'sophia@thedifferenceengine.io'
      // to: `${nomination.providerEmailAddress}`,
    },
    locals: {
      name: 'John',
      // name: `${nomination.patientName}`,
      // lname: 'Snow',
    }
  }).then(() => console.log('email has been sent!'));

}

module.exports = {
  sendDeclineEmail
}
