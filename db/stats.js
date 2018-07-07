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
        this.getData();
    }

    getData() {
        if(fs.existsSync(this.fileName)) {
            this.data = JSON.parse(fs.readFileSync(this.fileName).toString());
        }
    }

    updateData(amount, destCurrency) {

        // add new data data to existing stats
        this.data.amount += amount;
        this.data.currencies[destCurrency] = this.data.currencies[destCurrency] + 1 || 1;
        this.data.requests++;
        // exclude max used destination currency
        // fs.writeFileSync(this.fileName, JSON.stringify({
        //     amount: this.data.amount,
        //     currencies: this.date.currencies,
        //     requests: this.data.requests
        // }));
        this.getMostUsedDestCurrency();
        fs.writeFileSync(this.fileName, JSON.stringify(this.data));
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

