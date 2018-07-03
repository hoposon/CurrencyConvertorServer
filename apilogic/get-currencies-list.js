const axios = require('axios'); // http request library

// fixer API components- returns list of currencies
const API_URL = 'http://data.fixer.io/api/symbols'; // API URL
const API_KEY = 'access_key=6dc55fc14ad2e142f61f9d1032c6eb45'; // api access key
const apiUrl = `${API_URL}?${API_KEY}`;

// callback function for /getCurrencies endpoint
getCurrenciesList = (req, res) => {
    // call fixer API to get list of currencies
    axios.get(apiUrl).then((response) => {
        console.log(response);
        res.send({
            status: response.status,
            data: response.data
        });
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
}




module.exports = {getCurrenciesList}