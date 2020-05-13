const fs = require('fs');
const axios = require('axios');
const atob = require('atob');
const Jimp = require('jimp');

const {instance: api, MinecraftUserEndpoint} = require('./MinecraftUserEndpoint');
const HTTPErrorHandler = require('../HTTPErrorHandler');

const MAX_CACHE_TIME_HEAD = 1000 * 60 * 10; // 10 minutes
const MAX_CACHE_TIME_SKINS = 1000 * 60 * 10; // 10 minutes
const MAX_CACHE_TIME_PLAYER_INFO = 1000 * 60 * 2; // 2 minutes

const WRITE_OPTIONS = {
    encoding: 'utf8',
    flag: 'w'
};


class MinecraftHandler {

    static MAX_CACHE_TIME_HEAD = MAX_CACHE_TIME_HEAD;
    static MAX_CACHE_TIME_SKINS = MAX_CACHE_TIME_SKINS;
    static MAX_CACHE_TIME_PLAYER_INFO = MAX_CACHE_TIME_PLAYER_INFO;


    static isExpiredHead = (headFileCreationTimeNumber = 0) => {
        if (typeof headFileCreationTimeNumber !== typeof 0) return null;
        const now = new Date().getTime();
        return (headFileCreationTimeNumber + MAX_CACHE_TIME_HEAD) < now;
    };

    static isExpiredSkin = (skinFileCreationTimeNumber = 0) => {
        if (typeof skinFileCreationTimeNumber !== typeof 0) return null;
        const now = new Date().getTime();
        return (skinFileCreationTimeNumber + MAX_CACHE_TIME_SKINS) < now;
    };

    static isExpiredInfo = (infoFileCreationTimeNumber = 0) => {
        if (typeof infoFileCreationTimeNumber !== typeof 0) return null;
        const now = new Date().getTime();
        return (infoFileCreationTimeNumber + MAX_CACHE_TIME_PLAYER_INFO) < now;
    };

    static fetchImage = async (url) => {
        const config = {
            url,
            responseType: 'arraybuffer'
        };

        return axios(config);
    };

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     */
    static getDetailPath = (uuid) => {
        return `cache/mc/detail/${uuid}.json`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     */
    static getPlayerPath = (uuid) => {
        return `cache/mc/player/${uuid}.json`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     */
    static getHeadPath = (uuid) => {
        return `cache/mc/head/${uuid}.png`;
    }

    /**
     * this path is relative to the program entry point (root level index.js in this case)
     */
    static getSkinPath = (uuid) => {
        return `cache/mc/skin/${uuid}.png`;
    }


    fetchAndSaveUserData = async (uuid) => {
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) 
            throw Error(`Invalid uuid argument "${uuid}" provided to MinecraftHandler#fetchAndSaveUserData()`);

        // fetch mojang API response...
        const data = await api.getUserData(uuid);
        if (HTTPErrorHandler.isError(data)) 
            throw Error(`Error fetching user data for "${uuid}" in MinecraftHandler#fetchAndSaveUserData()`, data);

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

        const playerData = {id, name, hasSkin, isAlex : isAlex}; // we will now handle "/player" data, which is a simplified (internal usage) version of "detail"

        fs.writeFileSync(pathPlayer, JSON.stringify(playerData), WRITE_OPTIONS);

        if (!hasSkin) return; // player doesn't have a skin. End here, nothing else to do.



        // Else we will finalise by writing the head and skin file.

        const skinURI = textureDetail.textures['SKIN'].url;

        const response = await MinecraftHandler.fetchImage(skinURI); // download skin image from URI
        const skinImgBuffer = Buffer.from(response.data, 'binary'); // create nodeJS buffer based on skin image response

        // write bare skin file (we don't really need to edit anything about this)
        fs.writeFileSync(pathSkin, skinImgBuffer, WRITE_OPTIONS);


        // we will now try to generate the "head" image by doing some cropping and overlaying...
        try {
            const image = await Jimp.read(skinImgBuffer); // read skin image
            const hair = image.clone();

            image.crop(8,8,8,8); 
            hair.crop(40,8,8,8); 
            image.composite(hair, 0, 0); // place hair on top of base image crop

            await image.writeAsync(pathHead); // finally, write "head" file...

        } catch (e) {
            console.error(e);
            return null;
        }
    };
}

module.exports = {
    MinecraftHandler,
    instance: new MinecraftHandler()
};