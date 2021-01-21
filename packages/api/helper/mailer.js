const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const emailTemplate = require('email-templates');
const previewEmail = require('preview-email');
const path = require('path');

module.exports = {
  sendVerification: (nomination) => {
    var transport = {
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
    
    var transporter = nodemailer.createTransport(smtpTransport(transport));
    
    const email = new emailTemplate({
      transport: transporter,
      send: true,
      preview: true,
    });
    
    email.send({
      template: 'verifyHcEmail',
      message: {
        // from: 'Bill <bill@keepswimmingfoundation.org>',
        from: 'formmaster@keepswimmingfoundation.org',
        to: 'astheod5@gmail.com',
        // to: nomination.providerEmailAddress,
      },
      locals: {
        name: 'John',
      }
    }).then(() => console.log('email has been sent!'))
      .catch(console.error);

    // transporter.verify((error, success) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('All works fine, congratz!');
    //   }
    // });

//     let mailOptions = {
//       from: 'formmaster@keepswimmingfoundation.org',
//       to: nomination.providerEmailAddress,
//       subject: 'Email Verification',
//       text: `Hello ${nomination.providerName},
//       In order to process your application, we need you to verify your email. Please click the following link or copy and paste into your browser to complete the email verification.
//       ${nomination.verificationCode}

//       Keep Swimming Foundation`,
//     };

//     transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//         console.log(err);
//         console.log('there was an error, email did not send');
//       } else {
//         console.log('email sent!');
//       }
//     });
  },
};
