# CurrencyConvertorServer
Application server for currency conversions

## Installation:

1. Download or clone the repository
2. Run `npm install`

## Start server:

1. Run `node server/server.js`
- to successfuly start the server file `/db/datafiles/currencies.json` must exist

## API documentation:

API documentation can be found here:
https://app.swaggerhub.com/apis/hoposons/CurrencyConvertor/1.0.0#/convert/convert

## Project Structure
_/server_
- _server.js_ - main server file

_/server/config_ - configuration files
- _config.js_ - main config
- _currencies.js_ - currencies list for validations
- _response.js_ - response codes and messages

_/server/apilogic_ - server 'routes' function (express-routes are not used)
- _get-currencies-list.js_ - GET /getCurrencies API
- _get-stats.js_ - GET /stats API
- _convert-amount.js_ - GET /convert API

_/server/validations_ - APIs parameter validations
- _convert.js_ - validations def for convert API

_/server/db_ - statistics storage
- _stats.js_ - Stats class - handles statistics storage

_/server/db/datafiles_ - statistics storage datafiles
- _currencies.json_ - stores currencies for validations and GET /getCurrencies API
- _stats.json_ - stores the statistics
