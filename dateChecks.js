var async = require('async');

function dateInTheFuture(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT COUNT(*) AS count FROM " + tableName + " WHERE " + columnName + " > NOW()", function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        if (results[0].count !== 0) {
            console.log('Future dates in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function dateIsDefault(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT COUNT(*) AS count FROM " + tableName + " WHERE " + columnName + " < '1980-01-01 00:00:00'", function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        if (results[0].count !== 0) {
            console.log('Default dates in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function dateEqualToNull(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    async.parallel([
        function(callback) {

            increaseOperationsToComplete();
            pool.query("SELECT COUNT(*) AS count from " + tableName + " where " + columnName + " is NULL", function (error, results) {
                if (error) {
                    throw error;
                }

                increaseOperationsCompleted();

                return callback(null, results[0].count);
            });
        },
        function(callback) {
            increaseOperationsToComplete();
            pool.query("SELECT COUNT(*) AS count from " + tableName, function (error, results) {
                if (error) {
                    throw error;
                }

                increaseOperationsCompleted();

                return callback(null, results[0].count);
            });

        }
    ], function(err, results) {


        if(results[0] !== 0 && results[0] !== results[1]) {
            console.log('Null dates in ' + tableName + ' table, column: ' + columnName);
        }
    });
}



function getRegularDateChecks() {
    return ['dateInTheFuture', 'dateIsDefault', 'dateEqualToNull'];
}


module.exports.getRegularDateChecks = getRegularDateChecks;
module.exports.dateInTheFuture = dateInTheFuture;
module.exports.dateIsDefault = dateIsDefault;
module.exports.dateEqualToNull = dateEqualToNull;