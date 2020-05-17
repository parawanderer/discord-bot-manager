const LoginLimitor = require('../services/LoginLimitor');
const { addError } = require('../services/sessionError');

const ERROR_CODE = 429;
const ERROR_MESSAGE = "Too many login attempts in a short time span";


module.exports = (req, res, next) => {

    const requestIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("IP: " + requestIP);

    if (!LoginLimitor.canLogin(requestIP)) {
        addError(req, ERROR_MESSAGE);
        
        res.redirect("/");
        return;
    }
        
    next();
};