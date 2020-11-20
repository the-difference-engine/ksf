const nodemailer = require('nodemailer');
// const creds = require('./config');

const creds = require('../config/config.json').credentials

module.exports = {
    sendVerification: (nomination) => {
        var transport = {
            host: 'smtp.gmail.com', // e.g. smtp.gmail.com
            port: 465,
            secure: true,
            auth: {
              type: 'OAuth2',
              user: 'ksf-122@windy-pier-289100.iam.gserviceaccount.com',
              serviceClient: '103590127307870269987',
              privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD0aZtDwP+w3tDz\nJsd+iLxEvec6ElcKullUw39RRQTEZLQo5XzOAeXAQ9jXm24DYACtknM8d1sxbDSo\ncehqpR8O4b6a8qEsRBPEG5ZsdInOy21jvur6THlkpKawrmI4zIGDhkER/Gi1IORL\nuAO3nQxDQ9VE+ka2+79EDWXGvxfVH6VGELBRHIaIhuhg6CiTcbP8Q0CsQXF3ZNcO\nxesDi5BQGh5hwU7syl69bYdVdgn9cSuVQc+k2NfEN8MmBXrMzbizx8Pcio/2wkkf\nhApmnFRqWz6vEjnBEkXFc6PNvlPQ2uQTiMVjEEZubGhu7vlm17v6DqngD12ankm8\nIENXeFo7AgMBAAECggEAYNVaY3yakQumQz+Q+EvaM239p19OxvxPmiqeTaeHnPu8\n+Rr62G+eBA+dYMa+zm2Bt0L3jvRG2Azjy/zdNStYY8ACkUchnfUW07KOZUfCtYCZ\nRVSFqkcULVCijgt49MHpah+Ntj+HiIOQj4NHTb7V9exxGZQC4kpZW+/m69gX7CKI\nSSUBl4r0c97A8HT2pPNgbpxyUzdfSj0zprDz9GBwimfSX4/CF8fVTZKjvKY8FLIm\nDMdzX87guA3AzjIG+z2XilJn9sE0hL7fwgJP4CjampIuLvh6AAM6V8ACNX/m/3vm\nUtb/txy1E4vBqsavFSYPYBj8Afq4MP+/3pABO9IOOQKBgQD/6dICOWVqqwTvJ0ld\nMqCTgouOfPhestWRFi1QfnrqSHN+QeWumvnkgD69NkNud+AO1DLFJ2z0dJ9lb4eG\nL745RJXswXllf/bxP1z2ISO+9QDa15Jh9oeVE2/bTuhdQMEF7cmFNLJxqmTZuUFe\n3AiAK7RfPqz5LRdDhKmRxZBOjwKBgQD0fsoVx2AR46Xpu91AvuKuxtRPCCL7OjKO\nbdakgQ7nfPbxSxcXg8XWnikgjn29LrkGmciiIBbxm5ZEdBmsbhWm+LRi13+tb+iX\nWgtG2HfHFimWmLzVaQUZ8ekGbWc6Hann8L/dyvWqF3YtmVQuGZyt3kMj+1gtHoZB\nrP/FcDvPlQKBgQCCXjEX5PlfL6Qh2Nes3J+kxbomak90npHhiXSoLuaa9zGuvg8t\ntdFbsGFFrqEHY5YGt97tRLpihg61c+2MVEIJloDxzVX0eQ3ptCe9UwCMxO8cjPkL\nYrWLIg23oSkKaHRseshQTZoiAXXC3HcKxfimop0OcDVZ8riJMsnXcteizQKBgQDQ\ntBY/BwTr4F51KcdRCGCp/tGmcPSjbWdQi1Qo8n3Nfq+xA38/tF1BuZqzzs5omiSZ\nDNbmBexv63cXEeAEf6f98tjQctHrM9bgs51iqU99Y162zcSLi20uW4Cl2ue+BSpO\n8gRmCGUx/3sCq5rfCz/ibxLy+Q+o3CCQmWNvn0F/DQKBgQC0tehd52DdquUSfPW1\n831Tvm/+moIVDqGPbeVDd7hrT2LkIZ430Qtx2k2c4xDkYYz9j46EG7ttqDe8qR+C\nguYA5/1ROLiyFIlH0Wp8QSYntPjp9ZMSNswKOmMsdRKeIupxoJnFhm/iQp0mGx5f\nXhw7z55gWr5IT+5nIOyVDHeRGA==\n-----END PRIVATE KEY-----\n'
            }
        }

        var transporter = nodemailer.createTransport(transport)

      
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('All works fine, congratz!');
            }
        });

        let mailOptions = {
            from: 'formmaster@keepswimmingfoundation.org',
            to: "k.sherrell.1028@gmail.com", // nomination.providerEmail
            subject: "test",
            text: `Please verify ${nomination.verificationCode}`
          }

          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log(err)
              console.log("there was an error, email did not send")
            } else {
              console.log("email sent!")
            }
          })
    }
}












  // node mailer function
  // update model to say that email has been verified. 


// Function to send the email


/*
Model -
blah blablah: blah blahblah
..................
validationCode: Random string consisting of numbers letters and special characters. Length of 9.


Setup endpoint
endpoint/validate/(code)

This would look like: http://localhost:3000/validate/Gxuuhxigto

  app.post(endpoint/validate/:code, (req,res)=>{

     // code = req.params.code

    Once this endpoint is hit.
    Seach for submission with the code
    If submission is found, update isValidated to true.
  })
*/

