'use strict'
const fs = require('fs');
const connectionData = fs.readFileSync('./configs/dbproperties.json');
const mysql = require('promise-mysql');

var getConnection = () => {
    var connectProp = JSON.parse(connectionData);
    return mysql.createConnection({
        host: connectProp.host,
        port: connectProp.port,
        user: connectProp.user,
        password: connectProp.password,
        database: connectProp.database,
        multipleStatements: true
    });
}

module.exports = {
    getConnection
}