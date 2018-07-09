// convertAmount function definition
// gets list of rates for conversion from fixer.io
// and updates conversions operations statistics

// 3rd party libraries
const axios = require('axios'); // http request library

// local modules
const config = require('../config/config'); // main config
const resCodes = require('../config/response'); // result codes config
const {Stats} = require('../db/stats'); // class stats

class Convert {
    constructor() {
        this.stats = new Stats(config.statsFileName); // statistics object used to get and set statistics
        this.requestConfig = { // axios request config
            method: 'get',
            url: config.getRates,
            headers: {},
            validateStatus: function (status) {
                return status !== 200 || status !== 304; // Reject only if the status code is not 200 or 304(return code for data not changed)
              }
        };
        this.cache = {}; // cache for rates from fixes.io

        this.convertAmount = this.convertAmount.bind(this);
    }

    // callback function for /convert endpoint
    convertAmount(req, res, next) {

        let data = {} // object for data that will be returned by this API

        axios(this.requestConfig).then((response) => {
            
            // handle response from fixer

            // status 200 is success and we have new data
            // staus 304 - we should take data from cache
            if (response.status === resCodes.success.status) {
                // only response with success true returns data
                if (response.data.success === true) {

                    // save new data to cache
                    this.cache = response.data;

                    // set headers for next request
                    this.requestConfig.headers['If-None-Match'] = response.headers.etag;
                    this.requestConfig.headers['If-Modified-Since'] = response.headers['last-modified'];
                }
            }

            const amount = req.query.amount;
            const fromCurrency = req.query.from;
            const toCurrency = req.query.to;
            let convertedAmount = 0;
            let amountUSD = 0;

            // make conversion to requested currency
            convertedAmount = amount / this.cache.rates[fromCurrency] * this.cache.rates[toCurrency];
            // convert to USD for statistics
            amountUSD = amount / this.cache.rates[fromCurrency] * this.cache.rates[config.statsCurrency];

            // set return data
            data = {
                timestamp: this.cache.timestamp,
                date: this.cache.date,
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
            return this.stats.updateData(amountUSD, toCurrency);

            // other responses are unssuccesful = do not return requested data
            throw new Error({
                message: 'Unable to get rates from fixer.io'
            });

        }).then(() => { // resolve update statistics promise
            
            // add stats to return data
            data.stats = this.stats.data;
            // send conversion result
            return res.header('Access-Control-Allow-Origin', '*').json({
                status: resCodes.success.status,
                data: data
            });
    
        }).catch((e) => {
            // process errors/unsuccessful requests
            next(e);
        })
    }
}


module.exports = new Convert();




// // variables
// const stats = new Stats(config.statsFileName); // statistics object
// let data = {}; // return data
// let Etag = { // Etag object for keeping header value used for validating fixer.io rates cache
//     Etag: '',
//     Date: ''
// }

// // callback function for /convert endpoint
// convertAmount = (req, res) => {

//     axios.get(config.getRates).then((response) => {
//         // handle response from fixer
//         // only request status 200 is success
//         if (response.status === resCodes.success.status) {
//             // only response with success true returns data
//             if (response.data.success === true) {
//                 // validate params 
//                 const amount = req.query.amount;
//                 const fromCurrency = req.query.from;
//                 const toCurrency = req.query.to;
//                 let convertedAmount = 0;
//                 let amountUSD = 0;

//                 // make conversion to requested currency
//                 convertedAmount = amount / response.data.rates[fromCurrency] * response.data.rates[toCurrency];
//                 // convert to USD for statistics
//                 amountUSD = amount / response.data.rates[fromCurrency] * response.data.rates[config.statsCurrency];

//                 // set return data
//                 data = {
//                     timestamp: response.data.timestamp,
//                     date: response.data.date,
//                     convertedData : {
//                         amount: convertedAmount,
//                         symbol: toCurrency
//                     },
//                     originalData : {
//                         amount: amount,
//                         symbol: fromCurrency
//                     }
//                 }
//                 // update statisctics
//                 // return promise - if resolved stats has statistics data
//                 return stats.updateData(amountUSD, toCurrency);
//             }
//         }

//         // other responses are unssuccesful.then(() => { // resolve update statistics promise

//             // add stats to return data
//             data.stats = stats.data;
//             // send conversion result
//             return res.header('Access-Control-Allow-Origin', '*').json({
//                 status: resCodes.success.status,
//                 data: data
//             });

//     }) = do not return requested data
//         throw new Error({
//             message: 'Unable to get rates from fixer.io'
//         });
        
//     }).catch((e) => {
//         // process errors/unsuccessful requests
//         next(e);
//     })
// }


// module.exports = {convertAmount};