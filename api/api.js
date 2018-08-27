const bodyParser = require('body-parser');
const routes = require('./routes.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1/hundo');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));

app.use('/', routes);

app.listen(4000, () => console.log('💯 api'));
