'use strict'
var braintree = require('braintree');
const constants = require("../configs/constants");
const dbHelper = require('../controller/dbHelper');

class BraintreePaymentProcessor {
    /**
     * Creates a braintree request object to be used for creating payment
     * @return {object} - returns a braintree transaction.sale() response object
     */
    createSettlementObject() {
        return new Promise((resolve, reject) => {
            var gateway = braintree.connect({
                environment: braintree.Environment.Sandbox,
                merchantId: process.env.BRAINTREE_MERCHANT_ID,
                publicKey: process.env.BRAINTREE_PUBLIC_KEY,
                privateKey: process.env.BRAINTREE_PRIVATE_KEY
            });

            var merchantidObj = {
                'USD': 'personal',
                'EUR': 'parag_bosta',
                'THB': 'parag_bosta_thb',
                'HKD': 'parag_bosta_hkd',
                'SGD': 'parag_bosta_sgd',
                'AUD': 'parag_bosta_aud'
            }
            var updateId = this.updateId;

            gateway.transaction.sale({
                amount: this.price,
                paymentMethodNonce: this.paymentMethodNonce,
                merchantAccountId: merchantidObj[this.currency] || 'personal',
                options: {
                    submitForSettlement: true
                }
            }).then(function (result) {
                if (result.success) {
                    console.log('Transaction ID: ' + result.transaction.id);
                    dbHelper.updatePaymentDetails(constants.PAYMENT_SUCCESS_STATUS, updateId);
                    // return result;
                    resolve(result);
                } else {
                    console.error(result.message);
                    dbHelper.updatePaymentDetails(constants.PAYMENT_FAILED_STATUS, updateId);
                    // return result.message;
                    reject(result.message);
                }
            }).catch(function (err) {
                console.error(err);
                reject(err);
            });
        });
    }
}

module.exports = BraintreePaymentProcessor