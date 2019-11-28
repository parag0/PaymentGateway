var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/pay', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('initiatePayment', function (req, res, next) {
    console.log(req);
    res.send("/braintree");
});

module.exports = router;
