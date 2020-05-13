const botAPI = require('./axiosPreset');
const { API_URI_PUNISHMENTS } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');


/**
 * Handles everything else to do with the /punish bot API endpoints
 */
class PunishmentsEndpoint {
    botAPI = botAPI;

    // Get the recent most 50 punishments, if available
    getRecentPunishments = async () => {
        try { 
            return (await botAPI.get(`${API_URI_PUNISHMENTS}/history`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    searchRecentPunishments = async (/* Must include valid search params*/ searchParams) => {
        try { 
            // const searchParams = {
            //     per_page: null,
            //     page: null,
            //     username: null,
            //     discriminator: null,
            //     user_id: null
            // };

            return (await botAPI.post(`${API_URI_PUNISHMENTS}/history/search`, searchParams)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getPunishmentHistoryForUser = async (userID) => {
        try { 
            return (await botAPI.get(`${API_URI_PUNISHMENTS}/history/${userID}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    /**
     * Where action is either the string 'unmute', 'unban' or 'unpunish'
     */
    modifyPunishmentStatusForUser = async (userID, action) => {
        if (!((['unmute','unban','unpunish']).includes(action))) 
            throw new Error("PunishmentsEndpoint: Invalid action supplied to modifyPunishmentStatusForUser. Must be 'unmute', 'unban' or 'unpunish'")
        try { 
            return (await botAPI.put(`${API_URI_PUNISHMENTS}/history/${userID}`, action)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getPunishment = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_PUNISHMENTS}/punishment/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    wipePunishment = async (id) => {
        try { 
            return (await botAPI.delete(`${API_URI_PUNISHMENTS}/punishment/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

}

module.exports = PunishmentsEndpoint;