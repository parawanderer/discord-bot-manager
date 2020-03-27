const botAPI = require('./axiosPreset');
const { API_URI_RULES } = require('./URIs');

/**
 * Handles everything to do with /rules bot API endpoint
 */
class RulesEndpoint {
    botAPI = botAPI;

    get = async () => {
        try { 
            return (await botAPI.get(API_URI_RULES)).data;
        } catch (e) {
            return null;
        }
    };

    update = async (newData) => {
        // TODO: this needs to be error checked by the application. This has 0 error checking at the server side
        try { 
            return (await botAPI.put(API_URI_RULES, newData)).data;
        } catch (e) {
            return null;
        }
    };
}

module.exports = RulesEndpoint;
