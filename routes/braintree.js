var express = require('express');
var router = express.Router();
const constants = require("../configs/constants");
var braintreecontroller = require('../controller/braintreeController');

/* GET users listing. */
router.get('/pay', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/initiatePayment', async function (req, res, next) {
    try {
        let braintreeClass = new braintreecontroller();

        console.log(req.body);
        await braintreeClass.createSettlementObject.apply(req.body).then((responseObj) => {
            console.log("submitForSettlement");
            console.log(responseObj);
            res.send(responseObj);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(constants.GENERIC_ERROR);
    }
});

module.exports = router;
