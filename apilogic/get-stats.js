// getStats function definition
// gets statistics for conversion operations

// 3rd party libraries
const path = require('path');

// local modules
const config = require('../config/config'); // main config
const resCodes = require('../config/response'); // result codes config
const {Stats} = require('../db/stats'); // class stats

getStats = (req, res, next) => {

    // no parameters no input validation

    // set Stats instance
    const stats = new Stats(config.statsFileName); // statistics object
    stats.getData().then(() => {
        return res.header('Access-Control-Allow-Origin', '*').json({
            status: resCodes.success.status,
            data: stats.data
        })
    }).catch((e) => {
        // # log error

        // process errors/unsuccessful requests
        next(e);
        // return res.header('Access-Control-Allow-Origin', '*').status(404).json({
        //     success: false,
        //     error: 'Data not available'
        // })
    })
}

module.exports = {getStats}