/** index module to config express app server
 * @module src/index
 * @requires express
 * @requires bodyParser
 * @requires helmet
 * @requires morgan
 * @requires cors
 * @requires mongoConnection
 * @requires expressValidator
 * @requires wordRouter
 * @requires languageRouter
 */

/* ------------ Requiring Packages ------------ */
/**
 * express module
 * @const
 * @namespace express
 */
const express = require('express');

/**
 * body parser model
 * @const
 * @type {Object}
 * @namespace bodyParser
 */

const bodyParser = require('body-parser');

/**
 * helmet model to enhance the security of the server
 * @const
 * @type {Object}
 * @namespace helmet
 */
const helmet = require('helmet');

/**
 * morgan module to show the called endpoint with proper time
 * @const
 * @type {Object}
 * @namespace morgan
 */
const morgan = require('morgan');
/**
 * cors module to use cors-origin
 * @type {Object}
 * @const
 * @namespace cors
 */
const cors = require('cors');
/**
 * Object has function to connect to a mongoDB
 * @type {Object}
 * @const
 * @namespace mongoConnection
 */
const mongoConnection = require('./configuration/MongoConnection');
/**
 * express validator module to validate a {body,query,param} request
 * @const
 * @type {Object}
 * @namespace expressValidator
 */
const expressValidator = require('express-validator');

/* ------------ Choosing Env ------------ */
if (process.env.NODE === 'production' || process.env.NODE_ENV === 'staging') {
    require('custom-env').env(process.env.NODE_ENV);
} else {
    require('dotenv').config();
}
/* ------------ App Config ------------ */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());


/* ------------ Connecting to db ------------ */

mongoConnection(process.env.MONGO_URI);

/* ------------ Testing Backend ------------ */
/**
 * Route get backend health.
 * @name get/
 * @function
 * @memberOf module:src/index~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/', async (req, res) => {
    res.send('works just fine').status(200);
});
/* ------------ Importing Routes ------------ */
/**
 * wordRouter to use word route endpoints
 * @type {Object}
 * @const
 * @namespace wordRouter
 */
const wordRouter = require('./routes/wordRouter');
app.use('/words', wordRouter);

/**
 * languageRouter to use language route endpoints
 * @type {Object}
 * @const
 * @namespace languageRouter
 */
const languageRouter = require('./routes/languageRouter');

app.use('/languages', languageRouter);

/* ------------ Establish Server Connection ------------ */
const PORT = process.env.PORT || 8800;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
