#!/usr/bin/node
/* config web-server */

const express = require('express'); // import express module.
const morgan = require('morgan'); // import morgan HTTP request logger middleware.
const cors = require('cors'); // CORS middleware for Express.
const createError = require('http-errors'); // HTTP error handling middleware for Express.
const path = require('path'); // import path module.
const favicon = require('serve-favicon'); // import favicon module.

const port = process.env.PORT || 9000; // port for server assignment.
const  routesProject = require('./routes/index'); // import routes for project.

const app = express(); // create express app instance.

/* settings */
app.set('views', path.join(__dirname, 'views')); // set views directory.
app.engine('html', require('ejs').renderFile); // configured to write html tag, to be rendered with ejs
app.set('view engine', 'ejs'); // set view engine to html.
app.use(morgan('dev')); // use morgan middleware.

/* middleware */
app.use(cors()); // use cors middleware for Express to allow cross-origin resource sharing.
app.use(express.json()); // use json middleware for Express to parse JSON request bodies.
app.use(express.urlencoded({ extended: false })); // use urlencoded middleware for Express to parse URL-encoded request bodies.
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico'))); // use favicon middleware for Express to serve favicon file.

/* routes */
app.use('/', routesProject); // use routes for project to set routes.

/* static files */
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public directory.

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
    // catch 404 and forward to error handler middleware function.
    next(createError(404)); // create error object with status code 404.
    }
);

/* error handler */
app.use(function(err, req, res) {
    /* set message property of error object to error message property\n
    of error object in development environment and set it to local variable. */
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500); // render the error page with status code 500.
    res.render('error.html'); // render error page with error message.
});

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
