'use strict'
const express = require('express');
const router = express.Router();
const payPalcontroller = require('../controller/paypalController');
const constants = require("../configs/constants");

router.get('/pay', function (req, res, next) {
	console.log(req);
	var paymentId = req.query.paymentId;
	var payerId = { payer_id: req.query.PayerID };
	res.send(constants.PAYMENT_SUCCESSFUL);
});

router.get('/cancel', function (req, res, next) {
	res.send(constants.PAYMENT_NOT_SUCCESSFUL);
});

router.post("/initiatePayment", async function (req, res, next) {
	try {
		console.log(req.body);
		let amount = req.body.amount;
		let currency = req.body.currency;
		let customerName = req.body.cust_name

		let payPalClass = new payPalcontroller();

		let payObj = await payPalClass.getPaymentRequestObject(amount, currency);
		let redirectUrl = await payPalClass.createPayment(payObj);

		console.log("redirect url: " + redirectUrl);
		res.redirect(redirectUrl);
	} catch (err) {
		res.status(500).send(constants.GENERIC_ERROR);
	}
});

module.exports = router;
