const generateToken = require('../services/randomTokenGenerator');
const { generateDiscordOAuthURL, fetchUserToken, fetchUserData } = require('../services/discordOAUTH2');
const { AdminEndpoint } = require('../services/bot-api');
const limitLogins = require('../middlewares/limitLogins');
const { addError, clearError } = require('../services/sessionError');


const GENERIC_LOGIN_ERROR = "Error logging you in. Try again later!";
const GENERIC_ERROR = "Something went wrong. Try again later!";
const ERROR_NOT_ADMIN = "You are not a Bot Admin!";

module.exports = (app) => {
    
    app.get('/test/', (req, res) => {
        res.send("Hello World!");
    });


    /**
     * Handle signing in
     */
    app.get('/auth/discord',
    async (req, res) => {
        // if signed in return back to main page
        if (req.session.adminUID) {
            return res.redirect("/");
        }

        // get the original request uri from the path param if it was provided, or default to null
        const lastPath = req.query.q ? decodeURIComponent(req.query.q) : null; 

        // set up random session token/"state" argument for OAUTH2 on the user's cookie
        req.session.authState = await generateToken(36);

        // set up last path in session temporarily so we can redirect them back to it if they manage to log in successfully
        req.session.lastPath = lastPath;

        // now direct the user to the discord login page.
        res.redirect(generateDiscordOAuthURL(req));

    });


    /**
     * Log out user
     */
    app.get('/api/logout', (req, res) => {
        // we will reset their session data, effectively logging them out.
        delete req.session.authState;
        delete req.session.adminUID;
        delete req.session.isSuperAdmin;
        delete req.session.lastPath;

        res.redirect('/');
    });


    app.get('/api/self', (req, res) => {

        // if we access this, it will be safe to remove the error after this response
        const error = req.session.error ? req.session.error : false;
        clearError(req);  // once we access this, it's safe to remove the error from the session.

        if (!req.session.adminUID) {
            const data = {
                loggedIn: false,
                user: null,
            };
            if (error) data["error"] = error;

            res.send(data);
            return;
        }
        const data = {
            loggedIn: true,
            user: {
                adminUID: req.session.adminUID,
                username: req.session.username,
                isSuperAdmin: req.session.isSuperAdmin,
                avatar: req.session.avatar
            }
        };
        if (error) data["error"] = error;

        res.send(data);
    });

    
    /**
     * callback from discord API
     */
    app.get('/auth/discord/callback', 
    limitLogins,
    async (req, res) => {
        
        const lastPath = req.session.lastPath || null; // retrieve the last path from the session if it was set

        try {

            if (!req.query.code || !req.query.state) {
                // manual page access? missing required OAUT2 path parameters. We'll redirect to the index page.
                res.redirect("/");
                return;
            }

            // verify that session authState and state passed back by discord is the same. If not, show error.
            
            if (req.session.authState !== req.query.state) {

                addError(req, GENERIC_LOGIN_ERROR);
                res.redirect("/");

                //res.send(loginError);
                return;
            }

            // We will now finalize going through the OAUTH2 flow...
            const tokenData = await fetchUserToken(req);

            if (!tokenData) {
                // validate that we did, in fact, get returned the necessary data to proceed

                addError(req, GENERIC_ERROR);
                res.redirect("/");

                //res.send(genericError);
                return;
            }

            const userInfo = await fetchUserData(tokenData);

            if (!userInfo) {
                // verify that we did, in fact, fetch valid discord user data (no error)

                addError(req, GENERIC_ERROR);
                res.redirect("/");

                //res.send(genericError);
                return;
            }

            // check if the user is a current admin, by their discord ID.
            const admin = await AdminEndpoint.get(userInfo.id);

            if (admin === null) {
                // there was an error fetching admins (exception thrown)

                addError(req, GENERIC_ERROR);
                res.redirect("/");

                //res.send(genericError)
                return;
            }
            if (admin === false) {
                // this user is not an admin

                addError(req, ERROR_NOT_ADMIN);
                // we will redirect to the main page to show the error...
                res.redirect("/");

                return;
            }

            // else the user is an admin. Let's set this in their session...

            req.session.adminUID = admin.userId;
            req.session.username = userInfo.username;
            req.session.isSuperAdmin = admin.isSuperAdmin();
            req.session.avatar = userInfo.avatar;

            
            // we can clear any eventual errors...
            clearError(req);

            // we can now just redirect them back to either the page they initially 
            // requested, or the index page. They are logged in.

            res.redirect(lastPath || "/");
            

        } finally {
            // block to always clean up the session lastPath at this point,
            // even past the return statements above

            delete req.session.lastPath;
            delete req.session.authState; // also wipe their authState session member variable
        }

        // res.send({
        //     session : req.session,
        //     state: req.query,
        //     discordUser: userInfo
        // });
    });
};