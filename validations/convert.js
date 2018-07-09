// defines validations for /convert API

// 3rd party
const joi = require('joi');

// local modules - list of allowed currencies
const currenciesList = require('../config/currencies');

// set validation object
const validations = {
    convert: {
        query: {
            amount: joi.number().greater(0).required(),
            // from and to must be from defined list of currencies
            from: joi.any().valid(Object.keys(currenciesList)).required(),
            to: joi.any().valid(Object.keys(currenciesList)).required()
        }
    }
}

module.exports = validations;