const Admin = require('../../models/Admin');
const botAPI = require('./axiosPreset');
const { API_URI_ADMIN } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');

/**
 * Handles everything to do with /admin bot API endpoint
 */

class AdminEndpoint {
    botAPI = botAPI;

    getAll = async () => {
        try {
            const response = await botAPI.get(API_URI_ADMIN);
            const admins = [];

            if (Array.isArray(response.data)) {
                response.data.forEach((item) => {
                    if (Admin.checkValidAdmin(item)) 
                        admins.push(new Admin(item));
                });
                return admins;
            }
            return false;

        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    }   

    get = async (id) => {
        try {
            const response = await botAPI.get(`${API_URI_ADMIN}/${id}`);
            if (!Admin.checkValidAdmin(response.data)) return false; // invalid data/admin (or HTTP error of some kind)
            return new Admin(response.data);

        } catch (e) { 
            if (e.response.status === 404) return false; // server responded with 404, admin does not exist
            return HTTPErrorHandler.makeGenericError(e);
        }
    }

    // returns removed admin
    remove = async (id) => {
        try {
            const response = await botAPI.delete(`${API_URI_ADMIN}/${id}`);
            if (!Admin.checkValidAdmin(response.data)) return false; //invalid admin. could not remove admin/admin does not exist
            return new Admin(response.data);

        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    }

    // returns added admin
    add = async (userID, addedByID, addedByName) => {
        try {
            const data = {
                user_id: userID,
                added_by: addedByID,
                added_by_name: addedByName
            };

            const response = await botAPI.post(API_URI_ADMIN, data);
            if (!Admin.checkValidAdmin(response.data)) return false; //invalid admin. could not add admin or some error was thrown.
            return new Admin(response.data);

        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    }
}

module.exports = AdminEndpoint;