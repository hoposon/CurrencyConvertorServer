// class for loading statistics

// 3rd party libraries
const fs = require('fs');

// local modules
const config = require('../config/config'); // main config

class Stats {
    constructor(fileName) {

        this.fileName = fileName;   // path to statistics storage
        this.data = {
            amount: 0,              // total amount converted 
            currencies: {},         // statistics of usage of destination currencies
            requests: 0,            // number of conversions request
            maxCurrCode: null       // destination currency which is used the most
        };

    }

    // method for retrieving data from storage - stores them in this.data
    // method should support getting data from different storages
    getData() {
        switch(config.statsSource) {
            case 'file': // file storage
                if(fs.existsSync(this.fileName)) {
                    try {
                        // get data if file exists
                        this.data = JSON.parse(fs.readFileSync(this.fileName));
                        return Promise.resolve();
                    } catch(e) {
                        return Promise.reject(e);
                    }
                } else {
                    // return when file does not exists
                    return Promise.reject({
                        message: 'Statistics file does not exists. Path: this.fileName'
                    });
                }
                break;
            case 'db': // database storage
                // get data from db
                break;
        }
        
    }

    // method for updating data in storage
    // method should support updating data in different storages
    // 
    // prameters:
    //      amount - amount in USD
    //      destCurrency - destination currency used for the conversion
    updateData(amount, destCurrency) {

        // first get data
        this.getData().then(() => {
            // add new data data to existing stats
            this.data.amount += amount;
            this.data.currencies[destCurrency] = this.data.currencies[destCurrency] + 1 || 1;
            this.data.requests++;
            // set most used destination currency
            this.getMostUsedDestCurrency();

            // update stats to configured storage
            switch(config.statsSource) {
                case 'file': // file storage
                    try {
                        fs.writeFileSync(this.fileName, JSON.stringify(this.data));
                        return Promise.resolve();
                    } catch(e) {
                        return Promise.reject({
                            message: 'Stats data not updated',
                            exception: e
                        });
                    }
                    break;
                case 'db': // database storage
                    // get data from db
                    break;
            }

        })
    }

    // set most used destination currency
    // value is found in stored staistics data
    getMostUsedDestCurrency() {
        let maxCurrUsageCount = 0;
        let maxCurrCode;
        for (let curr in this.data.currencies) {
            if (maxCurrUsageCount < this.data.currencies[curr]) {
                maxCurrUsageCount = this.data.currencies[curr];
                maxCurrCode = curr;
            }
        }
        this.data.maxCurrCode = maxCurrCode
    }
}


module.exports = {Stats}

