// getStats function definition
// gets statistics for conversion operations

// 3rd party libraries
const path = require('path');

// local modules
const {Stats} = require('../db/stats'); // class stats

// compose file path
const fileName = path.join(__dirname,'../db/datafiles/stats.txt');

getStats = (req, res) => {

    // no parameters no input validation

    const stats = new Stats(fileName);
    if(stats.data.maxCurrCode) {
        res.header('Access-Control-Allow-Origin', '*').send({
            success: true,
            data: stats.data
        })
    } else {
        res.header('Access-Control-Allow-Origin', '*').status(404).send({
            success: false,
            error: 'Data not available'
        })
    }
}

module.exports = {getStats}