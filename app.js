#!/usr/bin/node
/* config web-server */

const express = require('express'); // import express module.
const morgan = require('morgan'); // import morgan HTTP request logger middleware.
const cors = require('cors'); // CORS middleware for Express.
//var createError = require('http-errors');; // HTTP error handling middleware for Express.
const path = require('path'); // import path module.
var favicon = require('serve-favicon'); // import favicon module.
require('dotenv').config(); // import dotenv module to load environment variables from .env file
const { auth } = require('express-openid-connect'); // import auth middleware.

require('./dataBase'); // import database module.

const port = process.env.PORT || 9000; // port for server assignment.
const routesProject = require('./src/routes/index'); // import routes for project.
const routesApi = require('./src/routes/api'); // import routes for api project (api.js).

/* consfig authentication */
const config = {
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
};

const app = express(); // create express app instance.

/* settings */
app.set('views', path.join(__dirname, 'src/views')); // set views directory.
app.engine('html', require('ejs').renderFile); // configured to write html tag, to be rendered with ejs
app.set('view engine', 'ejs'); // set view engine to html.

/* middleware */
app.use(cors()); // use cors middleware for Express to allow cross-origin resource sharing.
app.use(express.json()); // use json middleware for Express to parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // use urlencoded middleware for Express to parse URL-encoded request bodies.
app.use(favicon(path.join(__dirname, 'src/public/img', 'favicon.ico'))); // use favicon middleware for Express to serve favicon file.
app.use(morgan('dev')); // use morgan middleware.
app.use(auth(config)); // use auth middleware to authenticate users.


/* routes */
app.use('/', routesProject); // use routes for project to set routes.
app.use('/api', routesApi); // use routes for api project to set routes.

/* static files */
app.use(express.static(path.join(__dirname, 'src/public/css'))); // serve static files from public directory.


/* start server */
app.listen(port, () => {
    // start server on port 9000 and log message to console on success.
    console.log(`Server is running on port ${port}`); // log message to console on success to start server.
});

/* proces termination */
process.on('SIGTERM', () => {
    // on SIGTERM signal (kill) server will be terminated.
    app.close(() => {
        // close server and exit process.
        console.log('Process terminated') // log message to console when server is terminated successfully or not successfully terminated.
    })
});
