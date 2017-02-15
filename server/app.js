const express = require('express'),
      app = express(),
      session = require('express-session'),
      mongo = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      dbURL = require('./config/dbInfo')(),
      secret = require('./config/secret'),
      passport = require('passport'),
      initPassport = require('./auth/init'),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8000;

mongoose.connect(dbURL);

app.use(bodyParser());
app.use(session({ secret: secret() }));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

app.get('/', (req, res) => {
    res.end('HELLO BABALOO');
});

app.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.end('Success! ' + req.user);
});

app.listen(port);