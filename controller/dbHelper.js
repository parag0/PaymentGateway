'use strict'
const dbConnection = require('../controller/dbConnection');
const constants = require('../configs/constants');
var connection;

var insertOrderDetails = (customerName, amount, currency, cardholderName) => {
    return new Promise((resolve, reject) => {
        return dbConnection.getConnection().then((conn) => {
            connection = conn;

            var query = "INSERT INTO `paymentGateway`.`order_payment_details`(`id`,`customer_name`,`amount`,`currency`,`cardholder_name`,`payment_status`) VALUES (NULL,?,?,?,?,?);";
            var params = [customerName, amount, currency, cardholderName, constants.PAYMENT_PENDING_STATUS];
            return connection.query(query, params);
        }).then((resultData) => {
            console.log(resultData.insertId);
            resolve(resultData.insertId);
        }).catch((err) => {
            console.log(err);
            reject(err);
        }).finally(() => {
            connection.end();
        });
        // });
    });
}

var updatePaymentDetails = (paymentstatus, updateId) => {
    var connection;
    dbConnection.getConnection().then((conn) => {
        connection = conn;
        var query = "update `paymentGateway`.`order_payment_details` set payment_status=? where id=?;";
        var params = [paymentstatus, updateId];
        return connection.query(query, params);
    }).then((resultData) => {
        console.log(resultData);
        console.log("Status updated successfully");
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        connection.end();
    });
}

module.exports = {
    insertOrderDetails,
    updatePaymentDetails
}