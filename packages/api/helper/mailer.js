const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  sendVerification: (nomination) => {
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
        console.log('transporter is not working');
      } else {
        console.log('All works fine, congratz!');
      }
    });

    let mailOptions = {
      from: 'formmaster@keepswimmingfoundation.org',
      to: nomination.providerEmailAddress,
      subject: 'test',
      text: `Please verify ${nomination.verificationCode}`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        console.log('there was an error, email did not send');
      } else {
        console.log('email sent!');
      }
    });
  },
};
