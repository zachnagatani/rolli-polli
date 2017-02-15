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
      preAuth = require('./auth/preAuth'),
      port = process.env.PORT || 8000;

mongoose.connect(dbURL);

app.use(bodyParser());
app.use(session({ secret: secret() }));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// Hello world
app.get('/', (req, res) => {
    res.end('HELLO BABALOO');
});

app.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.end('Success! ' + req.user);
});

app.post('/login', passport.authenticate('login'), (req, res) => {
    res.end('Success!' + req.user);
});

app.post('/new-poll', /*preAuth,*/ (req, res) => {
    const newPoll = Poll({
        username: req.body.username,
        question: req.body.question,
        options: req.body.options
    });

    newPoll.save(err => {
        if (err) {
            return console.log(err);
        }

        console.log('Poll added.');
        res.end('Poll added: ' + newPoll);
    });
});

app.get('/polls', (req, res) => {
    Poll.find({})
        .sort('-createdAt')
        .exec((err, polls) => {
            if (err) {
                return console.log(err);
            }

            res.json(polls);
        });
});

app.listen(port);