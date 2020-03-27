const botAPI = require('./axiosPreset');
const { API_URI_PUNISHMENT_TYPES } = require('./URIs');


/**
 * Handles everything to do with the /punish/types bot API endpoints
 */
class PunishmentTypesEndpint {
    botAPI = botAPI;

    getAll = async () => {
        try { 
            return (await botAPI.get(API_URI_PUNISHMENT_TYPES)).data;
        } catch (e) {
            return null;
        }
    };


    get = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_PUNISHMENT_TYPES}/${id}`)).data;
        } catch (e) {
            return null;
        }
    };


    delete = async (id) => {
        try { 
            return (await botAPI.delete(`${API_URI_PUNISHMENT_TYPES}/${id}`)).data;
        } catch (e) {
            return null;
        }
    };

    update = async (id, newData) => {
        try { 
            return (await botAPI.put(`${API_URI_PUNISHMENT_TYPES}/${id}`, newData)).data;
        } catch (e) {
            return null;
        }
    };

    addNew = async (newType) => {
        try { 
            return (await botAPI.post(API_URI_PUNISHMENT_TYPES, newType)).data;
        } catch (e) {
            return null;
        }
    }

}

module.exports = PunishmentTypesEndpint;