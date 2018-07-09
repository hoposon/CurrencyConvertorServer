// logger definition

// 3rd party libraries
const winston = require('winston'); // logger lib
const DailyRotateFile = require('winston-daily-rotate-file'); // log file rotation lib

// local modules
const config = require('../config/config'); // main config

// define logger
const logger = winston.createLogger({
    level: config.logLevel, // log level from config
    format: winston.format.json(), // log format
    transports: [
        new DailyRotateFile({
            filename: `${config.logFilePath}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD-HH-mm',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '5'
        }) // combined log file
    ]
  });

  


  module.exports = logger;