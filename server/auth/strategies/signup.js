const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('../models/user'),
      bcrypt = require('bcrypt-nodejs');

// Export the signup strategy for Users
module.exports = passport => {
    passport.use('signup', new LocalStrategy({ passReqToCallback: true },
        (req, username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                // Handle error
                if (err) { return done(err) };

                // Don't continue if user is found
                if (user) {
                    return done(null, false, {message: 'User already exists with that username.'});
                }

                // Don't continue if password and password verification field don't match
                if (req.body.verify !== password) {
                    return done(null, false, {message: 'Passwords did not match'});
                }

                // Create new user with encrypted pw
                let newUser = User({
                    username: username,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
                });

                // Save user to database
                newUser.save(err => {
                    if (err) {
                        // TODO: Better error handling?
                        throw err;
                    }

                    console.log('User registration successful');
                    return done(null, newUser);
                });

            });
        }
    ));
};