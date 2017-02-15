const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('../models/user'),
      bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) { return done(err) };

            if (!user) {
                return done(null, false, { message: 'Incorrect details' });
            }

            if(!bcrypt.compare(password, user.password)) {
                return done(null, false, { message: 'Incorrect details'});
            }

            return done(null, user);
        });
    }
));