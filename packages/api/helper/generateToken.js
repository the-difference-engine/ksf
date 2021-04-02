const jwt = require('jsonwebtoken');

const generateToken = (nomination) => {
  return jwt.sign({ nomination }, 'sdifv8#$gjs-42_fsfja', {
    //process.env.JWT_SECRET
    expiresIn: '1d',
  });
};

module.exports = {
  generateToken,
};
