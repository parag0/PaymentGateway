'use strict'
var braintree = require('braintree');

class BraintreePaymentProcessor {
    // /**
    //  * Creates a braintree request object to be used for creating payment
    //  * @param {object} - accepts an argument object
    //  * @return {object} - returns a braintree transaction.sale() request object
    //  */
    // createParamObject() {
    //     return new Promise((resolve, reject) => {
    //         var merchantidObj = {
    //             'USD': 'personal',
    //             'EUR': 'parag_bosta',
    //             'THB': 'parag_bosta_thb',
    //             'HKD': 'parag_bosta_hkd',
    //             'SGD': 'parag_bosta_sgd',
    //             'AUD': 'parag_bosta_aud'
    //         }

    //         var saleObj = {
    //             amount: this.price,
    //             paymentMethodNonce: this.paymentMethodNonce,
    //             merchantAccountId: merchantidObj[this.currency] || 'personal',
    //             options: {
    //                 submitForSettlement: true
    //             }
    //         }
    //         resolve(saleObj);
    //     });
    // }

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
                    // return result;
                    resolve(result);
                } else {
                    console.error(result.message);
                    // return result.message;
                    resolve(result.message);
                }
            }).catch(function (err) {
                console.error(err);
            });
        });
    }
}

module.exports = BraintreePaymentProcessor