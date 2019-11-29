'use strict'
const express = require('express');
const router = express.Router();
const payPalcontroller = require('../controller/paypalController');
const constants = require("../configs/constants");
const dbHelper = require('../controller/dbHelper');

router.get('/pay', function (req, res, next) {
	var updateId = req.query.updateId;

	dbHelper.updatePaymentDetails(constants.PAYMENT_SUCCESS_STATUS, updateId);

	// res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.send(constants.PAYMENT_SUCCESSFUL);
});

router.get('/cancel', function (req, res, next) {
	var updateId = req.query.updateId;

	dbHelper.updatePaymentDetails(constants.PAYMENT_FAILED_STATUS, updateId);

	// res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.send(constants.PAYMENT_NOT_SUCCESSFUL);
});

router.post("/initiatePayment", async function (req, res, next) {
	try {
		console.log(req.body);
		let amount = req.body.amount;
		let currency = req.body.currency;
		let customerName = req.body.cust_name;
		let cardholderName = 'NA';

		let payPalClass = new payPalcontroller();

		let insertId = await dbHelper.insertOrderDetails(customerName, amount, currency, cardholderName);
		console.log("insertId: " + insertId);
		let payObj = await payPalClass.getPaymentRequestObject(amount, currency, insertId);
		// let payObj = await payPalClass.getPaymentRequestObject(amount, currency);
		let redirectUrl = await payPalClass.createPayment(payObj);

		console.log("redirect url: " + redirectUrl);
		res.redirect(redirectUrl);
	} catch (err) {
		console.log(err);
		res.status(500).send(constants.GENERIC_ERROR);
	}
});

module.exports = router;
