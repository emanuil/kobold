var async = require('async');

function numberEqualToNull(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

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
            console.log('Null values in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function numberNotZeroOrOne(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    async.parallel([
        function(callback) {



            increaseOperationsToComplete();
            pool.query("SELECT COUNT(*) AS count from " + tableName + " where NOT (" + columnName + " = 0 OR " + columnName + "= 1)", function (error, results) {
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
            console.log('Null values in ' + tableName + ' table, column: ' + columnName);
        }
    });
}




function numberEqualToZero(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    async.parallel([
        function(callback) {

            increaseOperationsToComplete();
            pool.query("SELECT COUNT(*) AS count from " + tableName + " where " + columnName + " = 0", function (error, results) {
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
            console.log('Zero number in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function numberIsNegative(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT COUNT(*) AS count from " + tableName + " where " + columnName + " < 0", function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        if (results[0].count !== 0) {
            console.log('Negative values in ' + tableName + ' table, column: ' + columnName);
        }
    });
}




function getRegularNumberChecks() {
    return ['numberEqualToZero', 'numberEqualToNull', 'numberIsNegative'];
}


module.exports.getRegularNumberChecks = getRegularNumberChecks;
module.exports.numberEqualToZero = numberEqualToZero;
module.exports.numberEqualToNull = numberEqualToNull;
module.exports.numberIsNegative = numberIsNegative;
module.exports.numberNotZeroOrOne = numberNotZeroOrOne;

