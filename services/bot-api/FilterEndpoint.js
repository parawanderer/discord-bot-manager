const botAPI = require('./axiosPreset');
const { API_URI_FILTER } = require('./URIs');
const HTTPErrorHandler = require('../HTTPErrorHandler');


/**
 * Handles everything else to do with the /filter bot API endpoints
 */
class FilterEndpoint {
    botAPI = botAPI;

    getAllWords = async () => {
        try {
            return (await botAPI.get(`${API_URI_FILTER}/words`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getWord = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_FILTER}/words/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    /**
     * type can be ["whitelist", "exact_word", "containing_string"]
     * data is the word to add
     */
    addWord = async (type, data) => {
        if (!((["whitelist", "exact_word", "containing_string"]).includes(type)))
            throw new Error("FilterEndpoint: invalid type provided for addWord. Must be one of whitelist, exact_word, containing_string")
        try { 
            const postData = {
                type,
                data
            };
            return (await botAPI.post(`${API_URI_FILTER}/words`, postData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    deleteWord = async (id) => {
        try { 
            return (await botAPI.delete(`${API_URI_FILTER}/words/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    updateWord = async (id, type, data) => {
        if (!((["whitelist", "exact_word", "containing_string"]).includes(type)))
            throw new Error("FilterEndpoint: invalid type provided for updateWord. Must be one of whitelist, exact_word, containing_string")
        try { 
            const postData = {
                type,
                data
            };
            return (await botAPI.put(`${API_URI_FILTER}/words/${id}`, postData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };



    getAllLinks = async () => {
        try { 
            return (await botAPI.get(`${API_URI_FILTER}/links`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    getLink = async (id) => {
        try { 
            return (await botAPI.get(`${API_URI_FILTER}/links/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    deleteLink = async (id) => {
        try { 
            return (await botAPI.delete(`${API_URI_FILTER}/links/${id}`)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    addLink = async (data) => {
        try { 
            const postData = data;
            return (await botAPI.post(`${API_URI_FILTER}/links`, postData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

    updateLink = async (id, data) => {
        try { 
            const postData = {
                id,
                url: data.url
            };
            return (await botAPI.put(`${API_URI_FILTER}/links/${id}`, postData)).data;
        } catch (e) {
            return HTTPErrorHandler.makeGenericError(e);
        }
    };

}

module.exports = FilterEndpoint;