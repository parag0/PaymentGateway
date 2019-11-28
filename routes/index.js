var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/paypal', function (req, res, next) {
  res.sendFile(path.resolve() + '/views/paypal_checkout.html');
});

router.get('/braintree', function (req, res, next) {
  res.sendFile(path.resolve() + '/views/braintree_pay.html');
});

module.exports = router;
