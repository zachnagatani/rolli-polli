const passport = require('passport'),
      login = require('./strategies/login'),
      signup = require('./strategies/signup');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
};