'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: ({id, email}) => {
        return jwt.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    },
    verifyAndDecode: (token) => jwt.verify(token, process.env.TOKEN_SECRET)
}