const fs = require('fs');
const axios = require('axios');
const atob = require('atob');
const Jimp = require('jimp');

const {instance: api, MinecraftUserEndpoint} = require('./MinecraftUserEndpoint');
const HTTPErrorHandler = require('../HTTPErrorHandler');

const MAX_CACHE_TIME_SKINS = 1000 * 60 * 10; // 10 minutes
const MAX_CACHE_TIME_PLAYER_INFO = 1000 * 60 * 2; // 2 minutes

const WRITE_OPTIONS = {
    encoding: 'utf8',
    flag: 'w'
};

/*
TODO: eventually, it may be a better idea to update to using redis 
for same reasons as mentioned here: https://github.com/crafatar/crafatar

The tiny 8*8 pixel image files will spam up the storage space by taking out 16Kb blocks that they don't need
Thus an easier solution may be storing all of this in base 64 strings in a redish hash
*/

class MinecraftHandler {
    
    static MAX_CACHE_TIME_SKINS = MAX_CACHE_TIME_SKINS;
    static MAX_CACHE_TIME_PLAYER_INFO = MAX_CACHE_TIME_PLAYER_INFO;
    inProcess = [];
    debugRequestHistory = {};
    lastRequestHistory = {};


    /**
     * Used to check against current time if the creation time (in MS) is an expired or unexpired time
     * 
     * @param {number} skinFileCreationTimeNumber       mtime of the skin file
     * 
     * @returns {boolean|null}      Boolean if the `skinFileCreationTimeNumber` was provided based on whether 
     * or not it's considered "expired", null if `skinFileCreationTimeNumber` was not a valid number.
     */
    static isExpiredSkin = (skinFileCreationTimeNumber) => {
        if (typeof skinFileCreationTimeNumber !== typeof 0) return null;
        const now = new Date().getTime();
        return (skinFileCreationTimeNumber + MAX_CACHE_TIME_SKINS) < now;
    };

    /**
     * Used to check against current time if the creation time (in MS) is an expired or unexpired time
     * 
     * @param {number} infoFileCreationTimeNumber       mtime of the info file
     * 
     * @returns {boolean|null}      Boolean if the `skinFileCreationTimeNumber` was provided based on whether 
     * or not it's considered "expired", null if `skinFileCreationTimeNumber` was not a valid number.
     */
    static isExpiredInfo = (infoFileCreationTimeNumber) => {
        if (typeof infoFileCreationTimeNumber !== typeof 0) return null;
        const now = new Date().getTime();
        return (infoFileCreationTimeNumber + MAX_CACHE_TIME_PLAYER_INFO) < now;
    };

    /**
     * Internal helper. Will fetch the given URL as an arraybuffer
     * 
     * @returns {AxiosPromise<any>}
     */
    static fetchImage = async (url) => {
        const config = {
            url,
            responseType: 'arraybuffer'
        };

        return axios(config);
    };

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     * 
     * @param {string} uuid         String UUID of the minecraft user
     */
    static getDetailPath = (uuid) => {
        return `cache/mc/detail/${uuid}.json`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     * 
     * @param {string} uuid         String UUID of the minecraft user
     */
    static getPlayerPath = (uuid) => {
        return `cache/mc/player/${uuid}.json`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     * 
     * @param {string} uuid         String UUID of the minecraft user
     */
    static getHeadPath = (uuid) => {
        return `cache/mc/head/${uuid}.png`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     * 
     * @param {string} uuid         String UUID of the minecraft user
     */
    static getSkinPath = (uuid) => {
        return `cache/mc/skin/${uuid}.png`;
    }


    _addToInProcess = (uuid) => {
        this.inProcess.push(uuid);
    }

    _hasInProcess = (uuid) => {
        return this.inProcess.includes(uuid);
    }

    _removeInProcess = (uuid) => {
        const index = this.inProcess.indexOf(uuid);
        this.inProcess.splice(index, 1);
    }

    /**
     * This has multiple points at which it could throw an exception and die. Thus the exception must be catched for it externally.
     * Logically this is structured in such a way as to minimise issues if the process stops somewhere along the way.
     * 
     * @param {string} uuid         String UUID of the minecraft user to fetch the data for
     * 
     * @returns {Promise<void>} void
     */
    fetchAndSaveUserData = async (uuid) => {
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) 
            throw Error(`Invalid uuid argument "${uuid}" provided to MinecraftHandler#fetchAndSaveUserData()`);

        uuid = MinecraftUserEndpoint.stripDashesFromUUID(uuid);

        // fetch mojang API response...

         console.log("Preparing to fetch for", uuid); // DEBUG

        if (this._hasInProcess(uuid)) return; // don't make multiple calls while the other one has 
        // not yet finished for the same user, or we will get request banned from the mojang API
        
        let data;
        this._addToInProcess(uuid);

        try {
            data = await api.getUserData(uuid);
        } catch (e) {}

        this._removeInProcess(uuid);

        if (HTTPErrorHandler.isError(data)){
            const error = data; // data.response && data.response.request && data.response.request.data ? data.response.request.data  : data
            const errorDesc = `Error fetching user data for "${uuid}" in MinecraftHandler#fetchAndSaveUserData(): Returned status code ${error.status}`;
            console.error(errorDesc, error.data);
            throw Error(errorDesc);
        }


        // Debug block
        console.log("this.lastRequestHistory", this.lastRequestHistory); // DEBUG
        this.debugRequestHistory[uuid] = (this.debugRequestHistory[uuid] || 0) +1; // DEBUG
        console.log("this.debugRequestHistory", this.debugRequestHistory); // DEBUG
        const now = new Date().toString(); // DEBUG
        console.log("Now", now); // DEBUG
        console.log("last request:", this.lastRequestHistory[uuid]); // DEBUG
        console.log("last global request", this.lastRequestHistory['last global request']) // DEBUG
        this.lastRequestHistory[uuid] = `${now} (${uuid})`; // DEBUG
        this.lastRequestHistory['last global request'] = `${now} (${uuid})`; // DEBUG
        // end debug block


        /**
         * {
            id: "92ff6eb62f584edcad5326363317f3de",
            name: "Wanderer_",
            properties: [
            {
            name: "textures",
            value: "ewogICJ0aW1lc3RhbXAiIDogMTU4OTM2NzEyNjk5NywKICAicHJvZmlsZUlkIiA6ICI5MmZmNmViNjJmNTg0ZWRjYWQ1MzI2MzYzMzE3ZjNkZSIsCiAgInByb2ZpbGVOYW1lIiA6ICJXYW5kZXJlcl8iLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMTllOGZhYjM1NTA1NzE1YTAyZDY3MGE2YTE5ZWYwZjFkOWZmYjk4MTVkYTYzMzA5NDg3MTU0MDljNzZiNzEzZiIKICAgIH0sCiAgICAiQ0FQRSIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZTdkZmVhMTZkYzgzYzk3ZGYwMWExMmZhYmJkMTIxNjM1OWMwY2QwZWE0MmY5OTk5YjZlOTdjNTg0OTYzZTk4MCIKICAgIH0KICB9Cn0="
            }
            ]
            }
         */
        
        const { id, name, properties } = data;
        const pathDetail = MinecraftHandler.getDetailPath(id);
        const pathPlayer = MinecraftHandler.getPlayerPath(id);
        const pathHead = MinecraftHandler.getHeadPath(id);
        const pathSkin = MinecraftHandler.getSkinPath(id);
 

        // we will write this original response to /cache/mc/detail/<uuid>
        fs.writeFileSync(pathDetail, JSON.stringify(data), WRITE_OPTIONS);


        // we will now fetch the skin from the data we returned earlier (base64 encoded)
        const textureDetail = JSON.parse(atob(properties[0].value));
        const hasSkin = !!textureDetail.textures['SKIN']; // check if there is a skin (may not exist)
        const isAlex = hasSkin && textureDetail.textures['SKIN'].metadata && textureDetail.textures['SKIN'].metadata.model === "slim";

        const playerData = {id, name, hasSkin, isAlex}; // we will now handle "/player" data, which is a simplified (internal usage) version of "detail"

        fs.writeFileSync(pathPlayer, JSON.stringify(playerData), WRITE_OPTIONS);

        if (!hasSkin) {
            if (fs.existsSync(pathHead)) fs.unlinkSync(pathHead); // delete this if it exists, user no longer has a skin...
            if (fs.existsSync(pathSkin)) fs.unlinkSync(pathSkin); // delete this if it exists, user no longer has a skin...
            
            return; // player doesn't have a skin. End here, nothing else to do.
        }



        // Else we will finalise by writing the head and skin file.

        // we will first check if they may not (yet) be expired? 
        // We'll assume both have approx the same expiry date, so we will just look at the skin.

        if (fs.existsSync(pathSkin)) {
            // file already existed, now we will check the stats...
            const stats = fs.statSync(pathSkin);

            if (!MinecraftHandler.isExpiredSkin(stats.mtimeMs)) {
                return; // not yet expired. End processing here, we don't need to re-fetch skins..
            }
        }
        // else continue to updating the skin...

        const skinURI = textureDetail.textures['SKIN'].url;

        const response = await MinecraftHandler.fetchImage(skinURI); // download skin image from URI
        const skinImgBuffer = Buffer.from(response.data, 'binary'); // create nodeJS buffer based on skin image response

        // write bare skin file (we don't really need to edit anything about this)
        if (fs.existsSync(pathSkin)) fs.unlinkSync(pathSkin);
        fs.writeFileSync(pathSkin, skinImgBuffer, WRITE_OPTIONS);


        // we will now try to generate the "head" image by doing some cropping and overlaying...
        const image = await Jimp.read(skinImgBuffer); // read skin image
        const hair = image.clone();

        image.crop(8,8,8,8); 
        hair.crop(40,8,8,8); 
        image.composite(hair, 0, 0); // place hair on top of base image crop

        if (fs.existsSync(pathHead)) fs.unlinkSync(pathHead);
        await image.writeAsync(pathHead); // finally, write "head" file...
    };
}

module.exports = {
    MinecraftHandler,
    instance: new MinecraftHandler()
};