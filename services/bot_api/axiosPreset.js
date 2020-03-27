const axios = require('axios').default;

const { botAPIDomain, botAPIKey} = require('../../config/keys');


const TIMEOUT = 10000;

/**
 * 
 * See BOT api docs for more details...
 * 
 */
const botAPI = axios.create({
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        "X-Api-key" : botAPIKey
    },
    baseURL: botAPIDomain,
    timeout: TIMEOUT
});

module.exports = botAPI;