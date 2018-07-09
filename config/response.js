// response statuses and messages config

const response = {
    success: {
        status: 200
    },
    nochange: {
        status: 304
    },
    error: {
        status: 500,
        message: 'Internal server error'
    }
};



module.exports = response;