const botAPI = require('./axiosPreset');
const { API_URI_GUILD } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');

/**
 * Handles everything else to do with the /guild bot API endpoint
 */
class GuildEndpoint {
    botAPI = botAPI;

    getGuildInfo = async () => {
        try { 
            return (await botAPI.get(API_URI_GUILD)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getGuildRoleInfo = async () => {
        try { 
            return (await botAPI.get(`${API_URI_GUILD}/roles`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };
}

module.exports = GuildEndpoint;