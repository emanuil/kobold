var mysql = require('mysql');

var stringChecks = require('./stringChecks.js');
var numberChecks = require('./numberChecks.js');
var dateChecks = require('./dateChecks.js');


var arguments = process.argv.slice(2);


if(arguments.length !== 6) {
    console.log("Usage: node ./check_data.js [host] [port] [database] [username] [password] [relative_configuration_file_path]");
    process.exit(0);
}

var configuration = require(__dirname  + '/' + arguments[5]);

var pool  = mysql.createPool({
    connectionLimit: 10,
    host: arguments[0],
    port: arguments[1],
    database: arguments[2],
    user: arguments[3],
    password: arguments[4]
});


configuration.setDatabaseName(arguments[2]);
stringChecks.setDatabaseName(arguments[2]);

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
            var tableName = result['Tables_in_' + configuration.getDatabaseName()];

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


            if(columnType === 'varchar' || columnType === 'text' || columnType === 'json') {
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


    if(type === 'string' || type == 'json') {
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
