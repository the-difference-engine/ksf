const jwt = require('jsonwebtoken');

const generateToken = (nomination) => {
  return jwt.sign({ nomination }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  generateToken,
};
