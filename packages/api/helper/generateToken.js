const jwt = require('jsonwebtoken');


const generateToken = ( uniqueIdentifier ) => {
    return jwt.sign({ uniqueIdentifier  }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h'})
};

export default generateToken;