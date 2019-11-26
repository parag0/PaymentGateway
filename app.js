var express = require('express');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var requestId = require('express-request-id')();

var indexRouter = require('./routes/index');
var paypalRouter = require('./routes/paypal');
var braintreeRouter = require('./routes/braintree');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//request id setup
app.use(requestId);
logger.token('id', function getId(req) {
  return req.id
});

//logger setup
var loggerFormat = ':id [:date[web]]" :method :url" :status';

//log to stdout for HTTP status < 400
app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stderr
}));

//log to stderr for HTTP status > 400
app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/checkout', indexRouter);
app.use('/payments/paypal', paypalRouter);
app.use('/payments/braintree', braintreeRouter);

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Application running → PORT ${server.address().port}`);
});

module.exports = app;
