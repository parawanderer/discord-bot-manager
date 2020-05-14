const axios = require('axios');
const HTTPErrorHandler = require('../HTTPErrorHandler');

const TIMEOUT = 10000;

const api = axios.create({
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    baseURL: 'https://sessionserver.mojang.com/',
    timeout: TIMEOUT
});
// Only 1 request for the same skin of the same player per minute...

const generic400 = {
    status: 400,
    message: 'Bad Request',
    description: 'Invalid UUID provided'
};


class MinecraftUserEndpoint {
    api = api;

    static minecraftUUIDRegex = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
    static generic400 = generic400;

    static isValidUUID = (uuid) => {
        if (typeof uuid !== typeof '') return false;
        return MinecraftUserEndpoint.minecraftUUIDRegex.test(uuid);
    };

    static stripDashesFromUUID = (uuid) => {
        if (typeof uuid !== typeof '') return null;
        return uuid.replace(/-/g,'');
    }

    /**
     * Only one request per minute is allowed for a given UUID
     * 
     * @param minecraftUUID         String UUID of user
     */
    getUserData = async (minecraftUUID) => {
        if (!MinecraftUserEndpoint.isValidUUID(minecraftUUID)) {
            return HTTPErrorHandler.makeError(generic400.status, generic400);
        }

        const uuid = MinecraftUserEndpoint.stripDashesFromUUID(minecraftUUID);

        try {
            return (await api.get(`session/minecraft/profile/${uuid}`)).data;
        } catch (e) {
            console.error("Error fetching Minecraft User Info", e);
            return HTTPErrorHandler.makeGenericError(e);
        }
    }
}

const instance = new MinecraftUserEndpoint();

module.exports = {
    instance,
    MinecraftUserEndpoint
};