const addError = (req, error) => {
    // adds error to session
    req.session.error = error;
};

const clearError = (req) => {
    // clears error from session
    delete req.session.error;
};

module.exports = {
    addError, clearError
};