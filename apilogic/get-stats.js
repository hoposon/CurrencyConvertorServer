// getStats function definition
// gets statistics for conversion operations

// 3rd party libraries
const path = require('path');

// local modules
const config = require('../config/config'); // main config
const resCodes = require('../config/response'); // result codes config
const {Stats} = require('../db/stats'); // statistics class

// callback function for GET /stats endpoint
getStats = (req, res, next) => {

    // no parameters no input validation

    // set Stats instance
    const stats = new Stats(config.statsFileName); // statistics object
    // get statisctics data
    stats.getData().then(() => {
        // response back with status 200 and data
        return res.header('Access-Control-Allow-Origin', '*').json({
            status: resCodes.success.status,
            data: stats.data
        })
    }).catch((e) => {
        // process errors/unsuccessful requests
        next(e);
    })
}

module.exports = {getStats}