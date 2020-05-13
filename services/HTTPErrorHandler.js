const BACKUP_TEST_STRING = 'rando::mm:check//d333~!@_3r1';

class HTTPErrorHandler {
    static makeGenericError = (errorResponse) => {
        return {
            [BACKUP_TEST_STRING] : true,
            error: true,
            status: errorResponse.response.status,
            headers: errorResponse.response.headers,
            data: errorResponse.response.data
        };
    };

    static makeError = (status, data) => {
        return {
            [BACKUP_TEST_STRING] : true,
            error: true,
            status: status,
            headers: null,
            data: data
        }
    };


    static isError = (objectToCheck) => {
        if (typeof objectToCheck === typeof {}) {
            return objectToCheck.error === true && objectToCheck[BACKUP_TEST_STRING] === true;
        }
        return false;
    };
}

module.exports = HTTPErrorHandler;