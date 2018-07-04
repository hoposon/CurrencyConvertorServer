// convertAmount function definition
// gets list of rates for conversion from fixer.io

const axios = require('axios'); // http request library

// fixer API components- returns list of rates
const API_URL = 'http://data.fixer.io/api/latest'; // API URL
const API_KEY = 'access_key=6dc55fc14ad2e142f61f9d1032c6eb45'; // api access key

// complete URL
const apiUrl = `${API_URL}?${API_KEY}`;

// callback function for /convert endpoint
convertAmount = (req, res) => {

    axios.get(apiUrl).then((response) => {
        // handle response from fixer
        // only request status 200 is success
        if (response.status === 200) {
            // only response with success true returns data
            if (response.data.success === true) {
                res.send({
                    success: true,
                    data: {
                        timestamp: response.data.timestamp,
                        base: response.data.base,
                        date: response.data.date,
                        rates: response.data.rates
                    } 
                    
                })
            }
        }
        // # log error

        // other responses are unssuccesful = do not return requested data
        throw new Error('Can not get data');
    }).catch((e) => {
        // # log error
        // # handle better custom errors like ENOTFOUND vs errors from the API

        // process errors/unsuccessful requests
        res.status(500).send({
            success: false,
            error: e.message
        });
    })
}


module.exports = {convertAmount}