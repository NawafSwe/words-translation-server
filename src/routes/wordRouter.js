/** Express router providing word related routes
 * @module routes/wordRouter
 * @requires express
 */
/* ------------ Requiring Packages ------------ */
/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount word related functions on.
 * @type {object}
 * @const
 * @namespace route
 */
const route = express.Router();


/**
 *  express sanitizer used to sanitize a request from html tags and script injection.
 * @type {object}
 * @const
 * @namespace sanitizer
 */
const sanitizer = require('express-sanitizer');

/**
 *  sanitizerHelper object have functions to sanitize request.
 * @type {object}
 * @const
 * @namespace sanitizerHelper
 */
const sanitizerHelper = require('../helpers/sanitizerHelperFunctions');


/**
 *  validate object has functions to validate requests before going to mess with database.
 * @type {object}
 * @const
 * @namespace validate
 */

const validate = require('../utils/wordsValidators');

/**
 *  express validation result object holds the result after validation a request using express validator.
 * @const
 * @namespace validationResult
 */
const {validationResult} = require('express-validator/check');


/**
 *  wordController object have functions to call the database to do words CURD operation.
 * @type {object}
 * @const
 * @namespace wordController
 */
const wordController = require('../controllers/wordController');


/* ------------ Route Config ------------ */
route.use(sanitizer());

/* ---------- Routing ---------- */

/**
 * Route getting all words.
 * @name get/words
 * @function
 * @memberOf module:routes/wordRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
route.get('/', validate('getWords'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const response = await wordController.getWords();
        res.json(response).status(200);
    }
});
/**
 * Route post new word.
 * @name post/words
 * @function
 * @memberOf module:routes/wordRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

route.post('/', validate('postWord'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        await sanitizerHelper.sanitizeWord(req);
        const response = await wordController.postWord(req.body);
        res.json(response).status(200);
    }
});

/**
 * Route delete word by id.
 * @name delete/words/:id
 * @function
 * @memberOf module:routes/wordRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

route.delete('/:id', validate('deleteWordById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const response = await wordController.deleteWord(req.params.id);
        res.json(response).status(200);
    }
});

/**
 * Route get word by id.
 * @name delete/words/:id
 * @function
 * @memberOf module:routes/wordRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */

route.get('/:id', validate('getWordById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const id = req.params.id;
        const response = await wordController.getWordById(id);
        res.json(response).status(200);
    }

});

/**
 * Route update word by id.
 * @name put/words/:id
 * @function
 * @memberOf module:routes/wordRouter~route
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express validator middleware.
 * @param {callback} middleware - Express middleware.
 */
route.put('/:id', validate('putWordById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);

    } else {
        const response = await wordController.putWordById(id, req.body);
        res.json(response).status(200);
    }
});

/**
 * module exports the router for words collections.
 * @exports {Object}
 */
module.exports = route;
