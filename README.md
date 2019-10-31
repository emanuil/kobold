Usage: `node ./check_data.js [host] [database] [username] [password]`

This is a NodeJS proof of concept command line tool to automatically scans all MySQL tables for bad data.

Kobold automatically detects the column type and runs the appropriate default checks: numbers, strings and dates.
 
You can exclude individual tables from the scan by adding them to the array in `getTablesToIgnore()` function in `configuration.js` file.
You can enable/disable individual checks in specific columns. See the examples from `getCustomColumnChecks()` in `configuration.js` file.

