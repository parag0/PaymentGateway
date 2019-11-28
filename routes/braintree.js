var express = require('express');
var router = express.Router();
var braintree = require('braintree');

/* GET users listing. */
router.get('/pay', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/initiatePayment', function (req, res, next) {
    console.log(req.body);

    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });

    var nonceFromTheClient = req.body.paymentMethodNonce;

    var newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (error, result) {
        console.log("result:\n");
        console.log(result.statusHistory);
        console.log("\nerror:\n");
        console.log(error);
        if (result) {
            res.send(result);
        } else {
            res.status(500).send(error);
        }
    });
});

module.exports = router;
