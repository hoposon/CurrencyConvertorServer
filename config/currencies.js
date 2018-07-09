// gets currencies list for validations

// 3rd party libraries
const fs = require('fs');

// local modules
const config = require('./config'); // main config

// loads list of allowed currencies. If not loaded, app won't start
const currenciesList = JSON.parse(fs.readFileSync(config.currValDbPath));

module.exports = currenciesList;