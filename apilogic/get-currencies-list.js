// getCurrenciesList function definition
// gets currencies list from fixer.io

// 3rd party libraries
const axios = require('axios'); // http request library

// local modules
const config = require('../config/config'); // main config

// callback function for /getCurrencies endpoint
getCurrenciesList = (req, res) => {
    
    // no parameters no input validation

    // call fixer API to get list of currencies
    axios.get(config.getlistURL).then((response) => {

        // handle response from fixer
        // only request status 200 is success
        if (response.status === 200) {
            // only response with success true returns data
            if (response.data.success === true) {
                res.header('Access-Control-Allow-Origin', '*').send({
                    success: true,
                    data: response.data.symbols
                });
                return;
            }
        }
        // # log error

        // other responses are unssuccesful = do not return requested data
        throw new Error('Can not get data');
    }).catch((e) => {
        // # log error
        // # handle better custom errors like ENOTFOUND vs errors from the API

        // process errors/unsuccessful requests
        res.header('Access-Control-Allow-Origin', '*').status(500).send({
            success: false,
            error: e.message
        });
    })

}



module.exports = {getCurrenciesList}