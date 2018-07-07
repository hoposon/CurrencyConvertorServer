// convertAmount function definition
// gets list of rates for conversion from fixer.io
// and updates conversions operations statistics

// 3rd party libraries
const axios = require('axios'); // http request library

// local modules
const config = require('../config/config'); // main config
const resCodes = require('../config/response'); // result codes config
const {Stats} = require('../db/stats'); // class stats

// variables
const stats = new Stats(config.statsFileName); // statistics object
let data = {}; // return data

// callback function for /convert endpoint
convertAmount = (req, res) => {

    axios.get(config.getRates).then((response) => {
        // handle response from fixer
        // only request status 200 is success
        if (response.status === resCodes.success.status) {
            // only response with success true returns data
            if (response.data.success === true) {
                // validate params 
                const amount = req.query.amount;
                const fromCurrency = req.query.from;
                const toCurrency = req.query.to;
                let convertedAmount = 0;
                let amountUSD = 0;

                // make conversion to requested currency
                convertedAmount = amount / response.data.rates[fromCurrency] * response.data.rates[toCurrency];
                // convert to USD for statistics
                amountUSD = amount / response.data.rates[fromCurrency] * response.data.rates[config.statsCurrency];

                // set return data
                data = {
                    timestamp: response.data.timestamp,
                    date: response.data.date,
                    convertedData : {
                        amount: convertedAmount,
                        symbol: toCurrency
                    },
                    originalData : {
                        amount: amount,
                        symbol: fromCurrency
                    }
                }
                // update statisctics
                // return promise - if resolved stats has statistics data
                return stats.updateData(amountUSD, toCurrency);
            }
        }
        // # log error
        
        // other responses are unssuccesful = do not return requested data
        throw new Error({
            message: 'Unable to get rates from fixer.io'
        });
    }).then(() => { // resolve update statistics promise

            // add stats to return data
            data.stats = stats.data;
            // send conversion result
            return res.header('Access-Control-Allow-Origin', '*').json({
                status: resCodes.success.status,
                data: data
            });

    }).catch((e) => {
        // # log error
        
        // process errors/unsuccessful requests
        next(e);
        // return res.header('Access-Control-Allow-Origin', '*').status(500).json({
        //     success: false,
        //     error: 'Can not get data'
        // });
    })
}


module.exports = {convertAmount};





// // callback function for /convert endpoint
// convertAmount = (req, res) => {
    
//         axios.get(config.getRates).then((response) => {
//             // handle response from fixer
//             // only request status 200 is success
//             if (response.status === 200) {
//                 // only response with success true returns data
//                 if (response.data.success === true) {
//                     // validate params 
//                     let amount = req.query.amount;
//                     let fromCurrency = req.query.from;
//                     let toCurrency = req.query.to;
//                     let convertedAmount = 0;
//                     let amountUSD = 0;
    
//                     // when there is result it is possible to make the conversion and update statistics
//                     try {
    
//                         // make conversion to requested currency
//                         convertedAmount = amount / response.data.rates[fromCurrency] * response.data.rates[toCurrency];
    
//                         // convert to USD for statistics
//                         amountUSD = amount / response.data.rates[fromCurrency] * response.data.rates["USD"];
    
//                         // update statisctics
//                         const stats = updateStats(amountUSD, toCurrency);
    
//                         // send conversion result
//                         res.header('Access-Control-Allow-Origin', '*').send({
//                             success: true,
//                             data: {
//                                 timestamp: response.data.timestamp,
//                                 date: response.data.date,
//                                 convertedData : {
//                                     amount: convertedAmount,
//                                     symbol: toCurrency
//                                 },
//                                 originalData : {
//                                     amount: amount,
//                                     symbol: fromCurrency
//                                 },
//                                 stats
//                             } 
                            
//                         });
//                         return;
//                     }
//                     catch (e) {
//                         throw new Error(e.message);
//                     }
//                 }
//             }
//             // # log error
            
//             // other responses are unssuccesful = do not return requested data
//             throw new Error('Can not get data');
//         }).catch((e) => {
//             // # log error
//             // # handle better custom errors like ENOTFOUND vs errors from the API
    
//             // process errors/unsuccessful requests
//             res.header('Access-Control-Allow-Origin', '*').status(500).send({
//                 success: false,
//                 error: e.message
//             });
//         })
//     }