const express = require('express'),
      app = express(),
      session = require('express-session'),
      cors = require('cors'),
      path = require('path'),
      mongo = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
    //   dbURL = require('./config/dbInfo')(),
      dbURL = process.env.MONGOLAB_URI,
    //   secret = require('./config/secret'),
      secret = process.env.SECRET_PHRASE,
      passport = require('passport'),
      initPassport = require('./auth/init'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      Poll = require('./polls/model'),
      preAuth = require('./auth/preAuth');
      port = process.env.PORT || 8000;
      console.log(secret);

mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

app.use(express.static('client'));
app.use('/node_modules', express.static('node_modules'))
app.use(cors());
app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());
initPassport(passport);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
});

// API Routes
app.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.json(req.user.generateJwt(req.user.username, req.user._id));
});

app.post('/login', passport.authenticate('login'), (req, res) => {
    res.json(req.user.generateJwt(req.user.username, req.user._id));
});

app.post('/new-poll', preAuth, (req, res) => {
    const newPoll = Poll({
        username: req.body.username,
        question: req.body.question,
        options: req.body.options
    });

    newPoll.save(err => {
        if (err) {
            return console.log(err);
        }

        res.json(newPoll);
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
app.post('/update-poll/:id', (req, res) => {
    // Determine which options to pass depending on whether auth header is presenty
    const determineOptions = (req) => {
        if (req.headers.authorization) {
            return { options: req.body.options, $push: { voters: req.body.voter } };
        }

        return { options: req.body.options };
    };

    Poll.findByIdAndUpdate({
        _id: req.params.id
    }, determineOptions(req), {
        new: true
    }, (err, poll) => {
        if (err) {
            return console.log(err);
        }

        res.json(poll);
    });
});

app.delete('/delete-poll/:id', preAuth, (req, res) => {
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

app.get('/profile', preAuth, (req, res) => {
    console.log(req.user.username);
    res.json(req.user.username);
});

app.listen(port);