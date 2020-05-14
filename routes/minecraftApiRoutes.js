const fs = require('fs');
const Jimp = require('jimp');

const requireLogin = require('../middlewares/requireLogin');

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
     * Get user head by UUID
     * 
     * Assumed format of request
     * /api/mc/head/12345567894453453243.png?size=50
     * size 50 is default
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
        const dataPath = MinecraftHandler.getHeadPath(uuid);

        if (fs.existsSync(dataPath)) {
            // check if we've already saved the given head?
            try {
                const stats = fs.statSync(dataPath);

                if (MinecraftHandler.isExpiredSkin(stats.mtimeMs)) {
                    // expired skin. Fetch everything anew..
                    await minecraft.fetchAndSaveUserData(uuid);
                }
                // else not yet expired.
                
            } catch (err) {
                console.error(`Error fetching and updating user data for minecraft user ${uuid}`, err);
                return res.status(generic500.status).send(generic500); // there was an error retrieving stats.
            }
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
            console.error(`Error fetching and updating user data for minecraft user ${uuid}`, err);
            return res.status(generic500.status).send(generic500);
        }
    });


    /**
     * Get user skin by UUID
     * 
     * /api/mc/skin/12345567894453453243.png
     */
    app.get('/api/mc/skin/:uuid', 
    requireLogin,
    async (req, res) => {
        
        let uuid = req.params.uuid.replace('.png','');

        // verify that uuid is valid?
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) {
            // if invalid, error with message
            return res.status(MinecraftUserEndpoint.generic400.status).send(MinecraftUserEndpoint.generic400);
        }
        uuid = MinecraftUserEndpoint.stripDashesFromUUID(uuid);
        const dataPath = MinecraftHandler.getSkinPath(uuid);

        if (fs.existsSync(dataPath)) {
            // check if we've already saved the given skin?
            try {
                const stats = fs.statSync(dataPath);

                if (MinecraftHandler.isExpiredSkin(stats.mtimeMs)) {
                    // expired skin. Fetch everything anew..
                    await minecraft.fetchAndSaveUserData(uuid);
                }
                // else not yet expired.
                
            } catch (err) {
                return res.status(generic500.status).send(generic500); // there was an error retrieving stats.
            }
        } else {
            // skin did not yet exist.
            await minecraft.fetchAndSaveUserData(uuid);
        }

        // get skin image and render up to correct scale
        try {
            const imageBuffer = fs.readFileSync(dataPath);

            res.set('Content-Type', Jimp.MIME_PNG);
            res.set('Cache-Control', `public, max-age=${MAX_BROWSER_IMAGE_CACHE}`); // caching headers

            res.send(imageBuffer);

        } catch (e) {
            // there was an error reading the image
            return res.status(generic500.status).send(generic500);
        }
    });


    /**
     * Get player base info by UUID
     * 
     * /api/mc/skin/12345567894453453243
     */
    app.get('/api/mc/player/:uuid', 
    requireLogin,
    async (req, res) => {
        
        let uuid = req.params.uuid;

        // verify that uuid is valid?
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) {
            // if invalid, error with message
            return res.status(MinecraftUserEndpoint.generic400.status).send(MinecraftUserEndpoint.generic400);
        }
        uuid = MinecraftUserEndpoint.stripDashesFromUUID(uuid);
        const dataPath = MinecraftHandler.getPlayerPath(uuid);

        if (fs.existsSync(dataPath)) {
            // check if we've already saved the given player data?
            try {
                const stats = fs.statSync(dataPath);

                if (MinecraftHandler.isExpiredInfo(stats.mtimeMs)) {
                    // expired skin. Fetch everything anew..
                    await minecraft.fetchAndSaveUserData(uuid);
                }
                // else not yet expired.
                
            } catch (err) {
                return res.status(generic500.status).send(generic500); // there was an error retrieving stats.
            }
        } else {
            // skin did not yet exist.
            await minecraft.fetchAndSaveUserData(uuid);
        }

        try {
            const file = fs.readFileSync(dataPath, 'utf8');

            res.header("Content-Type",'application/json');
            res.send(file);

        } catch (err) {
            return res.status(generic500.status).send(generic500);
        }
    });


     /**
     * Get full player details by UUID
     * (original mojang API response)
     * 
     * /api/mc/detail/12345567894453453243
     */
    app.get('/api/mc/detail/:uuid', 
    requireLogin,
    async (req, res) => {
        
        let uuid = req.params.uuid;

        // verify that uuid is valid?
        if (!MinecraftUserEndpoint.isValidUUID(uuid)) {
            // if invalid, error with message
            return res.status(MinecraftUserEndpoint.generic400.status).send(MinecraftUserEndpoint.generic400);
        }
        uuid = MinecraftUserEndpoint.stripDashesFromUUID(uuid);
        const dataPath = MinecraftHandler.getDetailPath(uuid);

        if (fs.existsSync(dataPath)) {
            // check if we've already saved the given player data?

            try {
                const stats = fs.statSync(dataPath);

                if (MinecraftHandler.isExpiredInfo(stats.mtimeMs)) {
                    // expired skin. Fetch everything anew..
                    await minecraft.fetchAndSaveUserData(uuid);
                }
                // else not yet expired.

            } catch (err) {
                return res.status(generic500.status).send(generic500); // there was an error retrieving stats.
            }

        } else {
            // skin did not yet exist.
            await minecraft.fetchAndSaveUserData(uuid);
        }

        try {
            const file = fs.readFileSync(dataPath, 'utf8');

            res.header("Content-Type",'application/json');
            res.send(file);

        } catch (err) {
            return res.status(generic500.status).send(generic500);
        }
    });

};