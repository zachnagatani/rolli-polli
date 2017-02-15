const express = require('express'),
      app = express()
      mongo = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      dbURL = require('./config/dbInfo')(),
      port = process.env.PORT || 8000;

mongoose.connect(dbURL);

app.get('/', (req, res) => {
    res.end('HELLO BABALOO');
});

app.listen(port);