var paypal = require('paypal-rest-sdk');
const constants = require("../configs/constants");

// Creating an environment
let clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET;

class PayPalPaymentProcessor {

	constructor() {
		paypal.configure({
			mode: 'sandbox', // Sandbox or live
			client_id: clientId,
			client_secret: clientSecret
		});
	}

	/**
	 * Creates a payment request object to be used for creating payment
	 * @param {number} amount - amount to pay
	 * @param {string} currency - curreny to be used for transaction
	 * @return {object} - returns a json payment object
	 */
	getPaymentRequestObject(amount, currency) {
		return JSON.stringify({
			intent: 'sale',
			payer: {
				payment_method: 'paypal'
			},
			redirect_urls: {
				return_url: constants.PAYPAL_RETURN_URL,
				cancel_url: constants.PAYPAL_CANCEL_URL
			},
			transactions: [{
				amount: {
					total: amount,
					currency: currency
				},
				description: 'This is the payment transaction description.'
			}]
		});
	}

	/**
	 * Creates a payment request object to be used for creating payment
	 * @param {object} paymentReq - payment request json object
	 * @return {string} - returns redirect url for payment approval
	 */
	createPayment(paymentObj) {
		return new Promise((resolve, reject) => {
			if (paymentObj) {
				paypal.payment.create(paymentObj, function (error, payment) {
					var links = {};
					if (error) {
						reject(JSON.stringify(error));
					} else {
						payment.links.forEach(function (linkObj) {
							links[linkObj.rel] = {
								href: linkObj.href,
								method: linkObj.method
							};
						})
						if (links.hasOwnProperty('approval_url')) {
							resolve(links['approval_url'].href);
						} else {
							reject(constants.NO_REDIRECT_URI);
						}
					}
				});
			} else {
				reject(constants.INVALID_PARAMETER);
			}
		});
	}

	/**
	 * Creates a payment request object to be used for creating payment
	 * @param {number} amount - amount to pay
	 * @param {string} currency - curreny to be used for transaction
	 * @return {object} - returns a json payment object
	 */
	executePayment(paymentId, payerId) {
		return new Promise((resolve, reject) => {
			if (paymentId && payerId) {
				paypal.payment.execute(paymentId, payerId, function (error, payment) {
					if (error) {
						reject(JSON.stringify(error));
					} else {
						if (payment.state == 'approved') {
							resolve(constants.PAYMENT_SUCCESSFUL);
						} else {
							reject(constants.PAYMENT_NOT_SUCCESSFUL);
						}
					}
				});
			} else {
				reject(constants.INVALID_PARAMETER);
			}
		});
	}
}//PayPalPaymentProcessor

module.exports = PayPalPaymentProcessor