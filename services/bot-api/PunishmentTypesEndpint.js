const botAPI = require('./axiosPreset');
const { API_URI_PUNISHMENT_TYPES } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');


/**
 * Handles everything to do with the /punish/types bot API endpoints
 */
class PunishmentTypesEndpint {
    botAPI = botAPI;

    getAll = async () => {
        try { 
            return (await botAPI.get(API_URI_PUNISHMENT_TYPES)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };


    get = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_PUNISHMENT_TYPES}/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };


    delete = async (id) => {
        try { 
            return (await botAPI.delete(`${API_URI_PUNISHMENT_TYPES}/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    update = async (id, newData) => {
        try { 
            return (await botAPI.put(`${API_URI_PUNISHMENT_TYPES}/${id}`, newData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    addNew = async (newType) => {
        try { 
            return (await botAPI.post(API_URI_PUNISHMENT_TYPES, newType)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    }

}

module.exports = PunishmentTypesEndpint;