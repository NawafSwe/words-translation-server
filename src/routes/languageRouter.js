/** Express router providing language related routes
 * @module routes/languageRouter
 * @requires express
 * @requires validate
 * @requires sanitizer
 * @requires sanitizerHelper
 * @requires validationResult
 * @requires languageController
 */
/* ---------- Importing Packages ---------- */
/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount language related functions on.
 * @type {object}
 * @const
 * @namespace route
 */

const route = express.Router();

/**
 *  express sanitizer model used to sanitize a request from html tags and script injection.
 * @const
 * @namespace sanitizer
 */
const sanitizer = require('express-sanitizer');

/**
 *  express validation result object holds the result after validation a request using express validator.
 * @const
 * @namespace validationResult
 */
const {validationResult} = require('express-validator/check');


/**
 *  validate object has functions to validate requests before going to mess with database.
 * @type {object}
 * @const
 * @namespace validate
 */

const validate = require('../utils/wordsValidators');


/**
 *  languageController object have functions to call the database to do language CURD operation.
 * @type {object}
 * @const
 * @namespace languageController
 */
const languageController = require('../controllers/languageController');


/**
 *  sanitizerHelper object have functions to sanitize request.
 * @type {object}
 * @const
 * @namespace sanitizerHelper
 */
const sanitizerHelper = require('../helpers/sanitizerHelperFunctions');

/* ------------ Route Config ------------ */
route.use(sanitizer());


/* ---------- Routing ---------- */
/**
 * Route getting all languages.
 * @name get/languages
 * @function
 * @memberOf module:routes/languageRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
route.get('/', async (req, res) => {
    const response = await languageController.getLanguages();
    res.json(response).status(200);
});

/**
 * Route get language by id.
 * @name get/languages/:id
 * @function
 * @memberOf module:routes/languageRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
route.get('/:id', async (req, res) => {
    const response = await languageController.getLanguageById(req.params.id);
    res.json(response).status(200);
});

/**
 * Route update language by id.
 * @name put/languages/:id
 * @function
 * @memberOf module:routes/languageRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

route.put('/:id', async (req, res) => {
    const response = await languageController.putLanguage(req.params.id, req.body);
    res.json(response).status(200);
});

/**
 * Route delete language by id.
 * @name delete/languages/:id
 * @function
 * @memberOf module:routes/languageRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

route.delete('/:id', async (req, res) => {
    const response = await languageController.deleteLanguage(req.params.id);
    res.json(response).status(200);
});

/**
 * module exports the router for language collections.
 * @exports {Object}
 */
module.exports = route;
