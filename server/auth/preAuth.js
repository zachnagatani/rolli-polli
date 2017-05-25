const expressJwt = require('express-jwt'),
    //   secret = require('../config/secret');
    secret = process.env.SECRET_PHRASE;

module.exports = expressJwt({
    secret: secret
});