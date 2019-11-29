var express = require('express');
var router = express.Router();
const constants = require("../configs/constants");
var braintreecontroller = require('../controller/braintreeController');
const dbHelper = require('../controller/dbHelper');

router.get('/pay', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/initiatePayment', async function (req, res, next) {
    try {
        let braintreeClass = new braintreecontroller();

        console.log(req.body);
        var paramObj = {
            paymentMethodNonce: req.body.paymentMethodNonce,
            price: req.body.price,
            currency: req.body.currency,
            customerName: req.body.customerName,
            creditCardHolderName: req.body.creditCardHolderName
        }

        let insertId = await dbHelper.insertOrderDetails(paramObj.customerName, paramObj.price, paramObj.currency, paramObj.creditCardHolderName);

        paramObj.updateId = insertId;

        console.log(paramObj);

        await braintreeClass.createSettlementObject.apply(paramObj).then((responseObj) => {
            res.send(responseObj);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(constants.GENERIC_ERROR);
    }
});

module.exports = router;
