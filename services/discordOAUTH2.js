const { discordClientID, discordClientSecret, discordOauthURL, discordOauthRedirectURI } = require('../config/keys');
const axios = require('axios').default;
const querystring = require('querystring');


// Discord info

const TIMEOUT = 10000; // 10 seconds, or die.

const DISCORD_AUTH_URL = "https://discordapp.com/api/oauth2/token";
const DISCORD_SELF_INFO_URL = "https://discordapp.com/api/users/@me";

const GRANT_TYPE = "authorization_code";
const SCOPE = "identify";

/**
 * Get discord OAUTH starting URL (to start OAUTH2 process)
 * 
 * @param {Request} req 
 */
const generateDiscordOAuthURL = (req) => {
    return discordOauthURL + "&state=" + req.session.authState;
};

/**
 * Fetch discord access token for fetching user data. 
 * 
 * @param {string} code     Code returned from '/auth/discord/callback' path parameter code by discord
 * 
 * @returns {Promise}        Promise, or on resolve an object containing the fields "access_token", "token_type" "expires_in" "refresh_token" "scope"
 */
const fetchDiscordAccessToken = async (code) => {
    // fetches the access token as per https://discordapp.com/developers/docs/topics/oauth2
    const data = {
        client_id: discordClientID,
        client_secret: discordClientSecret,
        code: code,
        grant_type: GRANT_TYPE,
        redirect_uri: discordOauthRedirectURI,
        scope: SCOPE
    };

    return await axios.post(DISCORD_AUTH_URL, querystring.stringify(data), {
        timeout: TIMEOUT, // may throw a time out exception because of this...
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
};

/**
 *  Fetch the actual discord user data for the verified user.
 *  https://discordapp.com/developers/docs/resources/user#get-current-user
 *  https://discordapp.com/developers/docs/resources/user#user-object
 * 
 * 
 * @param {Object} param0       The returned object from {@link fetchDiscordAccessToken}
 * 
 * @returns {Promise}           On resolve, this will contain the user data.
 */
const fetchDiscordUserData = async ({access_token, token_type}) => {
    return await axios.get(DISCORD_SELF_INFO_URL, {
        headers: { 
            'accept': 'application/json',
            'Authorization': `${token_type} ${access_token}`,
        },
        timeout: TIMEOUT
    });
}

/**
 *  Exception & error handling wrapper for {@link fetchDiscordAccessToken}
 * 
 * @param {Request} req     Request as passed from express
 * 
 * @returns {Object | null | false}     Null on exception, false if data was returned but did not contain tokens, tokens object on success.
 */
const fetchUserToken = async (req) => {
    try {
        const response = await fetchDiscordAccessToken(req.query.code);

        if (response.data.access_token && response.data.token_type) 
            return response.data;
        
        return false;

    } catch (e) {
        return null;
    }
};

/**
 *  Exception & error handling wrapper for {@link fetchDiscordUserData}
 * 
 * @param {Object} tokenData    Valid data returned from {@link fetchUserToken} 
 * 
 * @returns {Object | null | false}     Null on exception, false if data was returned but did not contain discord user ID, discord user data on success
 */
const fetchUserData = async (tokenData) => {
    try {
        const response = await fetchDiscordUserData(tokenData);

        if (response.data.id) return response.data;
        return false;

    } catch (e) {
        return null;
    }
};


module.exports = { 
    generateDiscordOAuthURL, 
    fetchDiscordAccessToken, 
    fetchDiscordUserData, 
    fetchUserToken, 
    fetchUserData 
};