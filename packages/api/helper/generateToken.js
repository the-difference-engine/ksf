const jwt = require('jsonwebtoken');

const generateToken = (nomination) => {
  console.log('generated token');
  return jwt.sign({ nomination }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  generateToken,
};
