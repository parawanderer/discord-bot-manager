const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const generateToken = require('./services/randomTokenGenerator');
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

// app.use((req, res, next) => {
//     req.session.views = (req.session.views || 0) + 1;
//     res.end(req.session.views + ' views')
// }); 


// setup routes
app.get('/', async (req, res) => {
    res.redirect("http://localhost:3000/")

    // res.send(
    //     {   
    //         hello: "world",
    //         session: req.session
    //     }
    // );
});



require('./routes/authRoutes')(app);
require('./routes/botApiRoutes')(app);


if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // express will serve up index.html file if it doesnt recognize the route
    // catch all case. if none of the previous things work.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);