const SESSION_MAX_AGE = require('../services/SESSION_MAX_AGE');
const CLEANUP_MS = 1000 * 60 * 10; // 10 minutes

class SessionExpirer {

    expiredSessions = {};

    constructor() {
        setInterval(this._cleanupExpiredSessions, CLEANUP_MS); // setup cleanup loop
    }

    /**
     * Interaction point for adding the session of a given admin with 
     * id adminID to the expiry history, to be expired if they try to 
     * interact with the API at any later point in time
     */
    markForExpiry = (adminID) => {
        const now = new Date().getTime();

        this.expiredSessions[adminID] = {
            userId: adminID,
            at: now
        };
    }

    /**
     * Express middleware hookup
     */
    requestHandler = (req, res, next) => {
        if (!req.session.adminUID) return next(); // move on to the next handler if we're not logged in

        const userID = req.session.adminUID;

        this._cleanupIndividualExpiredSession(userID); // cleanup anything not relevant
        if (this._hasExpiredSession(userID)) {
            // their session is pending expiry... so we will expire/reset it now.
            delete req.session.authState;
            delete req.session.adminUID;
            delete req.session.isSuperAdmin;

            // finally, we will clear it from our own memory
            this._deletePendingExpirySession(userID);
        }

        return next();
    };

    _deletePendingExpirySession = (userID) => {
        return delete this.expiredSessions[userID];
    };

    _hasExpiredSession = (userID) => {
        return !!this.expiredSessions[userID];
    };

    _cleanupIndividualExpiredSession = (userID) => {
        if (!this.expiredSessions[userID]) return;

        const now = new Date().getTime();
        if ((this.expiredSessions[userID].at + SESSION_MAX_AGE) < now)
            delete this.expiredSessions[userID]; // already expired, just delete it to clean it up
    };

    _cleanupExpiredSessions = () => {
        console.log(">> SessionExpirer: Running Cleanup...")
        const now = new Date().getTime();

        Object.keys(this.expiredSessions).forEach(key => {
            let session = this.expiredSessions[key];

            if ((session.at + SESSION_MAX_AGE) < now) delete this.expiredSessions[key]; 
            // delete sessions that were expired that cannot be relevant anymore
        });
    };

}

const SessionExpirerInstance = new SessionExpirer();

module.exports = SessionExpirerInstance;