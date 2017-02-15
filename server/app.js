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
      Poll = require('./polls/model'),
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

app.post('/login', passport.authenticate('login'), (req, res) => {
    res.end('Success!' + req.user);
});

app.post('/new-poll', (req, res) => {
    const newPoll = Poll({
        username: req.body.username,
        question: req.body.question,
        options: req.body.options
    });

    newPoll.save(err => {
        if (err) {
            console.log(err);
        }

        console.log('Poll added.');
        res.end('Poll added');
    });
});

app.listen(port);