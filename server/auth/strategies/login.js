const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('../models/user'),
      bcrypt = require('bcrypt-nodejs');

module.exports = passport => {
    passport.use('login', new LocalStrategy( {usernameField: 'username'},
        (username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) { return done(err) };

                // No user found error handling
                if (!user) {
                    return done(null, false, { message: 'Incorrect details' });
                }

                // Passwords don't match error handling
                if(!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect details'});
                }

                return done(null, user);
            });
        }
    ));
};