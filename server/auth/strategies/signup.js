const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('../models/user'),
      bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            // Handle error
            if (err) { return done(err) };

            // Don't continue if user is found
            if (user) {
                return done(null, false, {message: 'User already exists with that email.'});
            }

            // Create new user with encrypted pw
            let newUser = User({
                email: email,
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