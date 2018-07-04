// updates statistics of coversion operations
// based on configuration file, it can use local file or mongo database

// 3rd party libraries
const path = require('path');

// # jeste doladit nacitani hodnot z konfigu a taky dodelat zapis do mongo databaze
// # asi by se to dalo nacpat spis rovnou do te classy
// log stats to local file
// -----------------------------------------------------------

// local modules
const {Stats} = require('../db/stats'); // class stats

// compose file path
const fileName = path.join(__dirname,'../db/datafiles/stats.txt');

// update statistics
updateStats = (amount, destCurrency) => {
    let stats = new Stats(fileName);
    stats.updateData(amount, destCurrency);
}



module.exports = {updateStats}