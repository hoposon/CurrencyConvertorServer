// main file - expressjs app

// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');
const validate = require('express-validation');

// local modules
const {getCurrenciesList} = require('../apilogic/get-currencies-list');
const {convertAmount} = require('../apilogic/convert-amount');
const {getStats} = require('../apilogic/get-stats');
const validations = require('../validations/convert'); 

// create express app
var app = express();
// set port
const port = process.env.PORT || 3000;

// apply bodyParser to each request
app.use(bodyParser.json());

// APIS section
// ------------------------------------------------------------------------------------

// GET /getCurrencies API - get list of currencies from fixer.io
// app.get('/getCurrencies', (req, res) => {
//     getCurrenciesList(req, res);
// });
app.get('/getCurrencies', getCurrenciesList);
// -------------

// GET /convert API - convert requested amount from/to requested currency
// this also updates the statistics
app.get('/convert', validate(validations.convert), convertAmount);
// app.get('/convert', validate(validations.convert), (req, res) => {
//     convertAmount(req, res);
// });
// -------------

// GET /stats API - gets conversion statistics
app.get('/stats', getStats);
// app.get('/stats', (req, res) => {
//     getStats(req, res);
// });
// -------------

// ------------------------------------------------------------------------------------

// error handler
app.use((err, req, res, next) => {
    if (err instanceof validate.ValidationError) {
      res.status(err.status).json(err);
    } else {
      res.status(500)
        .json({
          status: err.status,
          message: err.message
        });
    }
  });


// start server on given port
app.listen(port,() => {
    console.log(`Started on port ${port}`);
});