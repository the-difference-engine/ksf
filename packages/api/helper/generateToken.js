const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  console.log('generated token');
  return jwt.sign({ data: id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  generateToken,
};


