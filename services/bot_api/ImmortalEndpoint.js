const botAPI = require('./axiosPreset');
const { API_URI_IMMORTAL } = require('./URIs');


/**
 * Handles everything else to do with the /immortal bot API endpoint
 */
class ImmortalEndpoint {
    botAPI = botAPI;

    getAll = async () => {
        try { 
            return (await botAPI.get(API_URI_IMMORTAL)).data;
        } catch (e) {
            return null;
        }
    };

    get = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_IMMORTAL}/${id}`)).data;
        } catch (e) {
            return null;
        }
    };

    addImmortal = async (immortalData) => {
        // TODO: this needs error checking if it is ever to be used
        try { 
            return (await botAPI.post(API_URI_IMMORTAL, immortalData)).data;
        } catch (e) {
            return null;
        }
    };

    remove = async (id, removeLink) => {
        try { 
            if (removeLink) {
                return (await botAPI.delete(`${API_URI_IMMORTAL}/${id}`, { data: {
                    remove_link: true
                }})).data;
            } else {
                return (await botAPI.delete(`${API_URI_IMMORTAL}/${id}`)).data;
            }
        } catch (e) {
            return null;
        }
    };

}

module.exports = ImmortalEndpoint;