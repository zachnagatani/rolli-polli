// module.exports = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }

//     res.end('Bruh, yo tongue is so ashy. It\'s so dang ashy!');
// };
const expressJwt = require('express-jwt'),
      secret = require('../config/secret');

module.exports = expressJwt({
    secret: secret()
});