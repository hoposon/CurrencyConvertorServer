// getCurrenciesList function definition
// gets currencies list from fixer.io

// 3rd party libraries
const axios = require('axios'); // http request library

// local modules
const config = require('../config/config'); // main config
const resCodes = require('../config/response'); // result codes config

// callback function for GET /getCurrencies endpoint
getCurrenciesList = (req, res, next) => {
    
    // call fixer API to get list of currencies
    axios.get(config.getlistURL).then((response) => {

        // handle response from fixer
        // only request status 200 is success
        if (response.status === resCodes.success.status) {
            // only response with success true returns data
            if (response.data.success === true) {
                // response back with status 200 and data
                return res.header('Access-Control-Allow-Origin', '*').json({
                    status: resCodes.success.status,
                    data: response.data.symbols
                });
            }
        }

        // other responses are unssuccesful = do not return requested data
        throw new Error({
            message: 'Unable to get currencies list from fixer.io'
        });
        
    }).catch((e) => {
        // process errors/unsuccessful requests
        next(e);
    })

}



module.exports = {getCurrenciesList}