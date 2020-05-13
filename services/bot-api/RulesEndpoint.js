const botAPI = require('./axiosPreset');
const { API_URI_RULES } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');

/**
 * Handles everything to do with /rules bot API endpoint
 */
class RulesEndpoint {
    botAPI = botAPI;

    get = async () => {
        try { 
            return (await botAPI.get(API_URI_RULES)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    update = async (newData) => {
        // TODO: this needs to be error checked by the application. This has 0 error checking at the server side
        try { 
            return (await botAPI.put(API_URI_RULES, newData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };
}

module.exports = RulesEndpoint;
