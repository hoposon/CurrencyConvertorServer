// class for loading statistics

// 3rd party libraries
const fs = require('fs');

// local modules
const config = require('../config/config'); // main config

class Stats {
    constructor(fileName) {

        this.fileName = fileName;
        this.data = {
            amount: 0,
            currencies: {},
            requests: 0,
            maxCurrCode: null
        };

    }

    getData() {
        switch(config.statsSource) {
            case 'file':
                if(fs.existsSync(this.fileName)) {
                    try {
                        this.data = JSON.parse(fs.readFileSync(this.fileName));
                        return Promise.resolve();
                    } catch(e) {
                        return Promise.reject(e);
                    }
                } else {
                    return Promise.reject({
                        message: 'Statistics file does not exists. Path: this.fileName'
                    });
                }
                break;
            case 'db':
                // get data from db
                break;
        }
        
    }

    updateData(amount, destCurrency) {

        this.getData().then(() => {
            // add new data data to existing stats
            this.data.amount += amount;
            this.data.currencies[destCurrency] = this.data.currencies[destCurrency] + 1 || 1;
            this.data.requests++;
            this.getMostUsedDestCurrency();

            switch(config.statsSource) {
                case 'file':
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
                case 'db':
                    // get data from db
                    break;
            }

        })
    }

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

