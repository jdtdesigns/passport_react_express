const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect(`mongodb://localhost/passport_react`, {useMongoClient: true});

const passport = require('./modules/passport');


const app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build/')));

app.use(session({ 
  secret: 'hqrdm0A70cQANssDeCqLaXhh99tNPRB4', 
  proxy: true,
  resave: false, 
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

const passport_routes = require('./routes/passport_routes');
app.use('/auth', passport_routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = app;
