const fs = require('fs');
const Jimp = require('jimp');

const requireLogin = require('../middlewares/requireLogin');
const SessionExpirer = require('../middlewares/SessionExpirer');
const HTTPErrorHandler = require('../services/HTTPErrorHandler');

const { MinecraftUserEndpoint } = require('../services/minecraft-api/MinecraftUserEndpoint');
const { MinecraftHandler, instance : minecraft } = require('../services/minecraft-api/MinecraftHandler');


const generic500 = {
    status: 500,
    message: 'Internal Server Error',
    description: 'Internal Server Error'
};

const invalidSizeArgError = {
    status: 400,
    message: 'Bad Request',
    description: 'Path parameter "size" could not be parsed to a valid integer'
};

const sizeTooLargeError = {
    status: 400,
    message: 'Bad Request',
    description: 'Parameter "size" was too large!'
};


const MAX_SIZE_ARG = 1000;
const MAX_BROWSER_IMAGE_CACHE = 86400;

module.exports = (app) => {

    /**
     * Assumed format of request
     * /api/mc/user/head/12345567894453453243?size=50
     */
    app.get('/api/mc/head/:uuid', 
    requireLogin,
    async (req, res) => {
        
        let uuid = req.params.uuid.replace('.png','');
        const size = req.query.size ? parseInt(req.query.size) : 50;

        // verify that uuid is valid?
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) {
            // if invalid, error with message
            return res.status(MinecraftUserEndpoint.generic400.status).send(MinecraftUserEndpoint.generic400);
        }
        // verify that request params are valid?
        if (isNaN(size) || size <= 0) {
            return res.status(invalidSizeArgError.status).send(invalidSizeArgError);
        }
        else if (size > MAX_SIZE_ARG) {
            return res.status(sizeTooLargeError.status).send(sizeTooLargeError);
        }

        uuid = MinecraftUserEndpoint.stripDashesFromUUID(uuid);
        console.log("uuid", uuid);

        const dataPath = `cache/mc/head/${uuid}.png`;

        if (fs.existsSync(dataPath)) {
            // check if we've already saved the given head?
            fs.stat(dataPath, async (err, stats) => {
                if (err) {
                    return res.status(generic500.status).send(generic500); // there was an error retrieving stats.
                }

                if (MinecraftHandler.isExpiredHead(stats.mtimeMs)) {
                    // expired head. Fetch everything anew..
                    await minecraft.fetchAndSaveUserData(uuid);
                    
                } else {
                    // not yet expired.
                }
            });
        } else {
            // head did not yet exist.
            await minecraft.fetchAndSaveUserData(uuid);
        }

        // get head image and render up to correct scale
        try {
            const image = await Jimp.read(dataPath);
            image.resize(size, size, Jimp.RESIZE_NEAREST_NEIGHBOR).getBuffer(Jimp.MIME_PNG, (err, buffer) =>{ 
                //handle err
                if (err) return res.status(generic500.status).send(generic500);

                // send back image at the size requested (or default size 50)
                res.set('Content-Type', Jimp.MIME_PNG);
                res.set('Cache-Control', `public, max-age=${MAX_BROWSER_IMAGE_CACHE}`); // caching headers
                res.send(buffer); // send back image buffer
            });
        } catch (e) {
            // there was an error reading the image
            return res.status(generic500.status).send(generic500);
        }


        // const internalResponse = await GuildEndpoint.getGuildInfo();
        // if (HTTPErrorHandler.isError(internalResponse)) {
        //     return res.status(internalResponse.status).send(internalResponse.data); //
        // }
        // res.send(internalResponse);
    });

};