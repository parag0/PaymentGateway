let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Test group', function () {
    var host = "http://localhost:3001";
    var paypalInitPath = "/payments/paypal/initiatePayment";
    var paypalSuccessPath = "/payments/paypal/pay";
    var paypalCancelPath = "/payments/paypal/cancel";
    var braintreepath = "/payments/braintree/initiatePayment";

    it('should send parameters to : /payments/paypal/initiatePayment POST', function (done) {
        chai.request(host).post(paypalInitPath).set('content-type', 'application/x-www-form-urlencoded')
            .send({ amount: '50', currency: 'USD', cust_name: 'John Doe' })
            .end(function (error, response) {
                if (error) {
                    expect(error).to.have.status(500);
                }

                if (response) {
                    expect(response).to.redirect;
                    expect(response).to.have.status(200);
                }
                done();
            });
    });

    it('should send parameters to : /payments/paypal/pay GET', function (done) {
        chai.request(host).get(paypalSuccessPath).query({ updateId: '20' })
            .end(function (error, response, body) {
                if (error) {
                    expect(error).to.have.status(500);
                }

                if (response) {
                    expect(response).to.have.status(200);
                    expect(response.body).to.toString('Payment Successful');
                }
                done();
            });
    });

    it('should send parameters to : /payments/paypal/cancel GET', function (done) {
        chai.request(host).get(paypalCancelPath).query({ updateId: '20' })
            .end(function (error, response) {
                if (error) {
                    expect(error).to.have.status(500);
                }

                if (response) {
                    expect(response).to.have.status(200);
                    expect(response.body).to.toString('Payment Not Successful');
                }
                done();
            });
    });

    // it('should send parameters to : /payments/braintree/initiatePayment POST', function (done) {
    //     chai.request(host).post(braintreepath).set('content-type', 'application/json')
    //         .send({
    //             paymentMethodNonce: 'tokencc_bh_ssd5nw_zm9jms_9srmn3_fg7twd_9m7',
    //             price: '50',
    //             currency: 'USD',
    //             customerName: 'Parag Dilip Jadhav',
    //             creditCardHolderName: 'Parag Dilip Jadhav'
    //         }).end(function (error, response) {
    //             if (error) {
    //                 expect(error).to.have.status(500);
    //             }

    //             if (response) {
    //                 console.error(response);
    //                 expect(response).to.have.status(200);
    //             }
    //             done();
    //         });
    // });
});