const botAPI = require('./axiosPreset');
const { API_URI_MEMBERS } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');

/**
 * Handles everything else to do with the /member bot API endpoint
 */
class MemberEndpoint {
    botAPI = botAPI;

    getAll = async () => {
        try { 
            return (await botAPI.get(API_URI_MEMBERS)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    get = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_MEMBERS}/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getRoles = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_MEMBERS}/${id}/roles`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    addRoleToMember = async (id, roleID) => {
        try { 
            const data = {
                id: roleID
            };
            return (await botAPI.post(`${API_URI_MEMBERS}/${id}/roles`, data)).data;

        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    removeRoleFromMember = async (id, roleID) => {
        try { 
            const data = {
                id: roleID
            };
            return (await botAPI.delete(`${API_URI_MEMBERS}/${id}/roles`, {data})).data;
            
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

}

module.exports = MemberEndpoint;