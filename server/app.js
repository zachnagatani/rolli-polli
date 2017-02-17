const express = require('express'),
      app = express(),
      session = require('express-session'),
      cors = require('cors'),
      mongo = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      dbURL = require('./config/dbInfo')(),
      secret = require('./config/secret'),
      passport = require('passport'),
      initPassport = require('./auth/init'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      Poll = require('./polls/model'),
      preAuth = require('./auth/preAuth'),
      port = process.env.PORT || 8000;

mongoose.connect(dbURL);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser());
// app.use(session({ secret: secret() }));
app.use(passport.initialize());
// app.use(passport.session());
initPassport(passport);
// Hello world
app.get('/', (req, res) => {
    res.end('HELLO BABALOO');
});

app.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.redirect('http://localhost:3000/#/home');
});

app.post('/login', passport.authenticate('login'), (req, res) => {
    res.json(req.user.generateJwt());
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

app.get('/get-polls', (req, res) => {
    Poll.find({})
        .sort('-createdAt')
        .exec((err, polls) => {
            if (err) {
                return console.log(err);
            }

            res.json(polls);
        });
});

app.get('/get-polls/:user', (req, res) => {
    Poll.find({
        username: req.params.user
    }).sort('-createdAt')
      .exec((err, polls) => {
        if (err) {
            return console.log(err);
        }

        res.json(polls);
      });
});

app.get('/view-poll/:id', (req, res) => {
    Poll.findById({
        _id: req.params.id
    }, (err, poll) => {
        if (err) {
            return console.log(err);
        }

        res.json(poll);
    });
});


/** TODO: UPDATE POLL ENDPOINT FOR ADDING VOTES */
// app.post('/update-poll/:id', (req, res) => {
//     Poll.findByIdAndUpdate({
//         _id: req.params.id
//     }, {
//         poll
//     });
// });

app.delete('/delete-poll/:id', /*preAuth,*/ (req, res) => {
    Poll.findByIdAndRemove({
        _id: req.params.id
    }, err => {
        if (err) {
            return console.log(err);
        }

        res.status(200);
        res.end('Poll with id ' + req.params.id + ' deleted.');
    });
});

app.get('/profile', /*preAuth,*/ (req, res) => {
    console.log(req.user);
    res.json(req.user);
});

app.listen(port);