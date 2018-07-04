

// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');

// local modules
const {getCurrenciesList} = require('../apilogic/get-currencies-list');
const {convertAmount} = require('../apilogic/convert-amount');
const {getStats} = require('../apilogic/get-stats');


// create express app
var app = express();
// set port
const port = process.env.PORT || 3000;

// apply bodyParser to each request
app.use(bodyParser.json());

// APIS section
// ------------------------------------------------------------------------------------

// GET /getCurrencies API - get list of currencies from fixer.io
app.get('/getCurrencies', (req, res) => {
    getCurrenciesList(req, res);
});
// -------------

// GET /convert API - convert requested amount from/to requested currency
// this also updates the statistics
app.get('/convert', (req, res) => {
    convertAmount(req, res);
})
// -------------

// GET /stats API - gets conversion statistics
app.get('/stats', (req, res) => {
    getStats(req, res);
})
// -------------

// ------------------------------------------------------------------------------------


// start server on given port
app.listen(port,() => {
    console.log(`Started on port ${port}`);
});