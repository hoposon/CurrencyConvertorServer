// main config
const config = {};

// 3rd party libraries
const path = require('path');

// --------------------
// fixer.io APIs URLs
// --------------------

// api access key
const API_KEY = 'access_key=6dc55fc14ad2e142f61f9d1032c6eb45'; 

// get list of currencies URL
const API_URL_LIST = 'http://data.fixer.io/api/symbols'; // API URL
// complete URL
config.getlistURL = `${API_URL_LIST}?${API_KEY}`;

// get conversion rates URL
const API_URL_RATES = 'http://data.fixer.io/api/latest'; // API URL
// complete URL
config.getRates = `${API_URL_RATES}?${API_KEY}`;

// --------------------
// Validations
// --------------------
// currencies validation db file path
config.currValDbPath = path.join(__dirname, '../db/datafiles/currencies.json');

// --------------------
// Statistics
// --------------------

// load statistics from db or from file
config.statsSource = 'file' // or 'db'
// currency that is used for total amount
config.statsCurrency = 'USD';

// statistics db file path
config.statsFileName = path.join(__dirname,'../db/datafiles/stats.json');


module.exports = config;