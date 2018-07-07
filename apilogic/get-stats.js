// getStats function definition
// gets statistics for conversion operations

// 3rd party libraries
const path = require('path');

// local modules
const config = require('../config/config'); // main config
const {Stats} = require('../db/stats'); // class stats

getStats = (req, res) => {

    // no parameters no input validation

    // set Stats instance
    const stats = new Stats(config.statsFileName); // statistics object
    stats.getData().then(() => {
        return res.header('Access-Control-Allow-Origin', '*').json({
            success: true,
            data: stats.data
        })
    }).catch((e) => {
        return res.header('Access-Control-Allow-Origin', '*').status(404).json({
            success: false,
            error: 'Data not available'
        })
    })
}

module.exports = {getStats}