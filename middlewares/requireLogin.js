const ERROR_CODE = 401;
const ERROR_MESSAGE = "Unauthorized as Bot Administrator";


module.exports = (req, res, next) => {
    if (!req.session.adminUID)
        return res.status(ERROR_CODE).send(
            {
                error: ERROR_CODE,
                message: ERROR_MESSAGE
            }
        );
        
    next();
};