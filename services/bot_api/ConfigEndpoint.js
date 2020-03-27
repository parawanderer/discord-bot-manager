const botAPI = require('./axiosPreset');
const { API_URI_CONFIG } = require('./URIs');

/**
 * Handles everything to do with /config bot API endpoint
 */
class ConfigEndpoint {
    botAPI = botAPI;

    getMain = async () => {
        try { 
            return (await botAPI.get(`${API_URI_CONFIG}/main`)).data;
        } catch (e) {
            return null;
        }
    };

    updateMain = async (newData) => {
        // TODO:
        // this will throw errors from the api side if invalid formats are provided...
        try { 
            return (await botAPI.put(`${API_URI_CONFIG}/main`, newData)).data;
        } catch (e) {
            return null;
        }
    };

    getData = async () => {
        try { 
            return (await botAPI.get(`${API_URI_CONFIG}/data`)).data;
        } catch (e) {
            return null;
        }
    };

    updateData = async (newData) => {
        // TODO:
        // this will throw errors from the api side if invalid formats are provided...
        try { 
            return (await botAPI.put(`${API_URI_CONFIG}/data`, newData)).data;
        } catch (e) {
            return null;
        }
    };

}

module.exports = ConfigEndpoint;