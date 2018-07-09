// main file - expressjs app

// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');
const validate = require('express-validation');

// local modules
// -------------------------------------------------------------------------------------
// routs callbacks
const {getCurrenciesList} = require('../apilogic/get-currencies-list'); // GET /getCurrencies route callback function
const Convert = require('../apilogic/convert-amount'); // GET /convert route callback function
const {getStats} = require('../apilogic/get-stats'); // GET /stats route callback function

// validations
const validations = require('../validations/convert'); // validations definition

// configuration
const config = require('../config/config'); // result codes config
const resCodes = require('../config/response'); // result codes config

// logging
const logger = require('../logging/logger'); // logger
// -------------------------------------------------------------------------------------

// create express app
var app = express();
// set port
const port = process.env.PORT || config.port;

// apply bodyParser to each request
app.use(bodyParser.json());

// Routes section
// ------------------------------------------------------------------------------------

// GET /getCurrencies API - get list of currencies from fixer.io
app.get('/getCurrencies', getCurrenciesList);
// -------------

// GET /convert API - convert requested amount from/to requested currency
// this also updates the statistics
app.get('/convert', validate(validations.convert), Convert.convertAmount);
// -------------

// GET /stats API - gets conversion statistics
app.get('/stats', getStats);
// -------------

// ------------------------------------------------------------------------------------

// error handler
// ------------------------------------------------------------------------------------
app.use((err, req, res, next) => {
    if (err instanceof validate.ValidationError) { // handles validation specific errors
        res.header('Access-Control-Allow-Origin', '*').status(err.status).json(err);
    } else { // handles other errors
        // log detailed error to file
        logger.error(err);
        // send error response
        res.header('Access-Control-Allow-Origin', '*').status(resCodes.error.status).json({
            status: resCodes.error.status,
            message: resCodes.error.message
        });
    }
  });
// ------------------------------------------------------------------------------------


// start server on given port
app.listen(port,() => {
    console.log(`Started on port ${port}`);
});