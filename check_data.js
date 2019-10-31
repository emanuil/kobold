var mysql = require('mysql');

var configuration = require('./configuration');
var stringChecks = require('./stringChecks.js');
var numberChecks = require('./numberChecks.js');
var dateChecks = require('./dateChecks.js');


var arguments = process.argv.slice(2);


if(arguments.length !== 4) {
    console.log("Usage: node ./check_data.js [host] [database] [username] [password]");
    process.exit(0);
}


var pool  = mysql.createPool({
    connectionLimit: 10,
    host: arguments[0],
    database: arguments[1],
    user: arguments[2],
    password: arguments[3]
});


configuration.setDatabaseName(arguments[1]);

var operationsToComplete = 0;
var operationsCompleted = 0;


function increaseOperationsToComplete() {
    operationsToComplete += 1;
}


function increaseOperationsCompleted() {
    operationsCompleted += 1;
}


var schemaTree = {};


getAllTableNames();


function getAllTableNames() {

    operationsToComplete += 1;

    pool.query("SHOW TABLES", function (error, results) {
        if (error) {
            throw error;
        }

        operationsCompleted += 1;

        results.map(function(result) {
            var tableName = result.Tables_in_apps;


            if(configuration.getTablesToIgnore().indexOf(tableName) === -1) {
                schemaTree[tableName] = {};
                getAllTableColumnName(tableName);
            }

        });
    });
}


function getAllTableColumnName(tableName) {

    operationsToComplete += 1;

    pool.query("DESCRIBE " + tableName, function (error, results) {
        if (error) {
            throw error;
        }

        operationsCompleted += 1;

        results.map(function(result) {

            var columnName = result.Field;
            var columnType = result.Type.split('(')[0];


            if(columnType === 'varchar' || columnType === 'text') {
                scanAStringColumn(tableName, columnName, defineStringChecksToRun(tableName, columnName, 'string'));
            }

            if(columnType.indexOf('int') !== -1) {
                scanAStringColumn(tableName, columnName, defineStringChecksToRun(tableName, columnName, 'number'));
            }

            if(columnType.indexOf('datetime') !== -1) {
                scanAStringColumn(tableName, columnName, defineStringChecksToRun(tableName, columnName, 'date'));
            }


        });
    });
}


var regularStringChecks = stringChecks.getRegularStringChecks().map(function(checkName) {
    return 'stringChecks.' + checkName;
});


var regularNumberChecks = numberChecks.getRegularNumberChecks().map(function(checkName) {
    return 'numberChecks.' + checkName;
});

var regularDateChecks = dateChecks.getRegularDateChecks().map(function(checkName) {
    return 'dateChecks.' + checkName;
});


function defineStringChecksToRun(tableName, columnName, type) {

    var customColumnsChecks = configuration.getCustomColumnChecks();
    var checksToRun;


    if(type === 'string') {
        checksToRun = regularStringChecks;
    }

    if(type === 'number') {
        checksToRun = regularNumberChecks;
    }

    if(type === 'date') {
        checksToRun = regularDateChecks;
    }

    if(customColumnsChecks[tableName] && customColumnsChecks[tableName][columnName] && customColumnsChecks[tableName][columnName]['extraChecksToPerform']) {

        checksToRun = checksToRun.concat(customColumnsChecks[tableName][columnName]['extraChecksToPerform']);
    }

    if(customColumnsChecks[tableName] && customColumnsChecks[tableName][columnName] && customColumnsChecks[tableName][columnName]['regularChecksToSkip']) {
        var checksToRemove = customColumnsChecks[tableName][columnName]['regularChecksToSkip'];


        checksToRun = checksToRun.filter( function(currentCheck) {
            return checksToRemove.indexOf(currentCheck) < 0;
        } );
    }

    return checksToRun;
}



function scanAStringColumn(tableName, columnName, checksToRun) {

    checksToRun.map(function(checkName) {
        eval(checkName)(
            pool,
            tableName,
            columnName,
            increaseOperationsToComplete,
            increaseOperationsCompleted
        );
    });
}


pool.on('release', function() {
    if(operationsCompleted === operationsToComplete) {
        console.log('Done');
        pool.end(function() {})
    }
});
