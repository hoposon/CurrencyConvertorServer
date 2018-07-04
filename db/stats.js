const fs = require('fs');

class Stats {
    constructor(fileName) {

        this.fileName = fileName;
        this.data = {
            amount: 0,
            currencies: {},
            requests: 0
        };
        this.getData();
    }

    getData() {
        if(fs.existsSync(this.fileName)) {
            this.data = JSON.parse(fs.readFileSync(this.fileName).toString());
        }
    }

    updateData(amount, destCurrency) {

        this.data.amount += amount;
        this.data.currencies[destCurrency] = this.data.currencies[destCurrency] + 1 || 1;
        this.data.requests++;
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

        return maxCurrCode;
    }
}


module.exports = {Stats}

