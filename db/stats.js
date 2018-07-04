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
}


module.exports = {Stats}

