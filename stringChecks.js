var async = require('async');
var configuration = require('./configuration');


function stringEqualToNull(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

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


function stringEqualToEmpty(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT COUNT(*) AS count from " + tableName + " where " + columnName + " like ''", function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        if(results[0].count !== 0) {
            console.log('Empty values in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function stringTrimmed(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    // get the column capacity
    pool.query("SELECT CHARACTER_MAXIMUM_LENGTH AS columnCapacity from information_schema.columns where table_schema = '" + configuration.getDatabaseName() + "' AND table_name = '" + tableName + "' AND COLUMN_NAME = '" + columnName + "'", function (error, results) {
        if (error) {
            throw(error);
        }

        var columnCapacity = results[0].columnCapacity;

        if(columnCapacity === 0) {
            throw("Impossible column capacity of zero");
        }

        pool.query("SELECT count(*) AS count from " + tableName + " where CHAR_LENGTH(" + columnName + ") = " + columnCapacity, function (error, results) {
            if (error) {
                throw error;
            }

            increaseOperationsCompleted();

            if(results[0].count !== 0) {
                console.log('Possibly truncated values in ' + tableName + ' table, column: ' + columnName);
            }
        });
    });
}


function stringNonFacebookLink(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT " + columnName + " as data from " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        var hasNonFacebookURLs = false;

        results.map(function(result) {

            if(result.data.indexOf('https://www.facebook.com/') === -1) {

                hasNonFacebookURLs = true;

            }
        });

        if(hasNonFacebookURLs) {
            console.log('Non Facebook link URL in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function stringIsEqualToZero(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT COUNT(*) AS count from " + tableName + " where " + columnName + " like '0'", function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        if(results[0].count !== 0) {
            console.log('Zero string value in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function stringIsNotAnObject(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT " + columnName + " as data from " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        results.map(function(result) {

            var parsedObject = JSON.parse(result.data);

            if(typeof parsedObject !== 'object') {
                console.log('String is not an object in ' + tableName + ' table, column: ' + columnName);
            }
        });
    });
}

function stringIsNotArray(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT " + columnName + " as data from " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        results.map(function(result) {
            var parsedObject = JSON.parse(result.data);

            if(Array.isArray(parsedObject) !== true) {
                console.log('String is not an array in ' + tableName + ' table, column: ' + columnName);
            }
        });
    });
}

function stringIsNotInstagramLink(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT " + columnName + " as data from " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        var hasNonInstagramURLs = false;

        results.map(function(result) {

            if(result.data && result.data.indexOf('https://www.instagram.com/') === -1) {

                hasNonInstagramURLs = true;
            }
        });

        if(hasNonInstagramURLs) {
            console.log('Non Instagram link URL in ' + tableName + ' table, column: ' + columnName);
        }
    });
}

function stringIsNotURL(pool, tableName, columnName, increaseOperationsToComplete, increaseOperationsCompleted) {

    increaseOperationsToComplete();

    pool.query("SELECT " + columnName + " as data from " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        increaseOperationsCompleted();

        var hasAnyURL = false;

        results.map(function(result) {

            if(result.data && result.data.indexOf('https://') === -1) {

                hasAnyURL = true;

            }
        });

        if(hasAnyURL) {
            console.log('Non URL in ' + tableName + ' table, column: ' + columnName);
        }
    });
}


function getRegularStringChecks() {
    return ['stringEqualToNull', 'stringEqualToEmpty', 'stringTrimmed'];
}

module.exports.getRegularStringChecks = getRegularStringChecks;
module.exports.stringEqualToNull = stringEqualToNull;
module.exports.stringEqualToEmpty = stringEqualToEmpty;
module.exports.stringTrimmed = stringTrimmed;
module.exports.stringNonFacebookLink = stringNonFacebookLink;
module.exports.stringIsEqualToZero = stringIsEqualToZero;
module.exports.stringIsNotAnObject = stringIsNotAnObject;
module.exports.stringIsNotArray = stringIsNotArray;
module.exports.stringIsNotInstagramLink = stringIsNotInstagramLink;
module.exports.stringIsNotURL = stringIsNotURL;

