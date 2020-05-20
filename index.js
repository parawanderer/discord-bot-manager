const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const {MinecraftHandler} = require('./services/minecraft-api/MinecraftHandler');

if (process.env.NODE_ENV === 'production') require('dotenv').config();

const keys = require('./config/keys');

const SESSION_MAX_AGE = require('./services/SESSION_MAX_AGE');
const SessionExpirer = require('./middlewares/SessionExpirer');

const app = express();

// ================ setup ================
app.disable('x-powered-by');

app.use(bodyParser.json()); // body to json parser

// session handler
app.use(cookieSession(
    {
        name: '_sess',
        maxAge: SESSION_MAX_AGE, // 1 day
        keys: [keys.cookieKey]
    }
));

app.use('/api', SessionExpirer.requestHandler);

// initialize this handler
MinecraftHandler.onStartSetup();


// setup routes

require('./routes/authRoutes')(app);
require('./routes/botApiRoutes')(app);
require('./routes/minecraftApiRoutes')(app);


if (process.env.NODE_ENV === 'production') {


    // this is required to be above app.use(express.static('client/build')); for allowing this to overrule the index page
    app.get('/', (req, res) => {
        const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return console.log(err);
            const result = data.replace(/\{OG_DOMAIN}/g, keys.selfRootDomain); // inject rootDomain in place of {OG_DOMAIN} dynamically
            res.send(result);
        });
    });

    // express will serve up production assets like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // express will serve up index.html file if it doesnt recognize the route
    // catch all case. if none of the previous things work.
    const path = require('path');
    app.get('*', (req, res) => {
        const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return console.log(err);
            const result = data.replace(/\{OG_DOMAIN}/g, keys.selfRootDomain); // inject rootDomain in place of {OG_DOMAIN} dynamically
            res.send(result);
        });
        //res.sendFile();
    });
} else {
    app.get('*', async (req, res) => {
        res.redirect("http://localhost:3000" + (req.url || "/"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);