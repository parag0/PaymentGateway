'use strict'
const express = require('express');
const router = express.Router();
const payPalcontroller = require('../controller/paypalController');

router.get('/pay', function (req, res, next) {
	var paymentId = req.query.paymentId;
	var payerId = { payer_id: req.query.PayerID };

});

router.get('/cancel', function (req, res, next) {
	// console.log(req);
	res.send('Your Payment Has been canceled');
});

router.post("/intiatePayment", function (req, res, next) {
});

module.exports = router;
