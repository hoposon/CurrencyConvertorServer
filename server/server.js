
// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');

// local modules
const {getCurrenciesList} = require('../apilogic/get-currencies-list');


// create express app
var app = express();
// set port
const port = process.env.PORT || 3000;

// apply bodyParser to each request
app.use(bodyParser.json());

//GET /getCurrencies API
app.get('/getCurrencies', (req, res) => {
    getCurrenciesList(req, res);
});




// start server on given port
app.listen(port,() => {
    console.log(`Started on port ${port}`);
});