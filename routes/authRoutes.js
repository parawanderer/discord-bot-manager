const generateToken = require('../services/randomTokenGenerator');
const { generateDiscordOAuthURL, fetchUserToken, fetchUserData } = require('../services/discordOAUTH2');
const { AdminEndpoint } = require('../services/bot_api');
const limitLogins = require('../middlewares/limitLogins');
const { addError } = require('../services/sessionError');

module.exports = (app) => {
    
    app.get('/test/', (req, res) => {
        res.send("Hello World!");
    });


    /**
     * Handle signing in
     */
    app.get('/auth/discord/',
    async (req, res) => {
        // if signed in return back to main page

        // set up random session token/"state" argument for OAUTH2 on the user's cookie
        req.session.authState = await generateToken(36);

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

        res.redirect('/');
    });


    app.get('/api/self', (req, res) => {

        if (!req.session.adminUID) {
            res.send({
                loggedIn: false,
                error: req.session.error ? req.session.error : false,
                user: null,
            });
            return;
        }
        res.send({
            loggedIn: true,
            error: req.session.error ? req.session.error : false,
            user: {
                adminUID: req.session.adminUID,
                isSuperAdmin: req.session.isSuperAdmin
            }
        });
    });

    
    /**
     * callback from discord API
     */
    app.get('/auth/discord/callback', 
    limitLogins,
    async (req, res) => {
        
        //console.log(req.session);
        // console.log(req.query);
        const loginError = "Error logging you in. Try again later!";
        const genericError = "Something went wrong. Try again later!";

        if (!req.query.code || !req.query.state) {
            // manual page access? missing required OAUT2 path parameters. We'll redirect to the index page.
            res.redirect("/");
            return;
        }

        // verify that session authState and state passed back by discord is the same. If not, show error.
        if (req.session.authState !== req.query.state) {
            res.send(loginError);
            return;
        }

        // We will now finalize going through the OAUTH2 flow...
        const tokenData = await fetchUserToken(req);

        if (!tokenData) {
            // validate that we did, in fact, get returned the necessary data to proceed
            res.send(genericError);
            return;
        }

        const userInfo = await fetchUserData(tokenData);

        if (!userInfo) {
            // verify that we did, in fact, fetch valid discord user data (no error)
            res.send(genericError);
            return;
        }

        // check if the user is a current admin, by their discord ID.
        const admin = await AdminEndpoint.get(userInfo.id);

        if (admin === null) {
            // there was an error fetching admins (exception thrown)
            res.send(genericError)
            return;
        }
        if (admin === false) {
            // this user is not an admin
            addError('You are not a Bot Admin!')
            // for now just redirect to main page.
            res.redirect("/");
            return;
        }

        // else the user is an admin. Let's set this in their session...

        req.session.adminUID = admin.userId;
        req.session.isSuperAdmin = admin.isSuperAdmin();
        delete req.session.authState; // now also wipe their authState session member variable

        // we can now just redirect them back to the index page. They are logged in.
        res.redirect("/");

        // res.send({
        //     session : req.session,
        //     state: req.query,
        //     discordUser: userInfo
        // });
    });
};