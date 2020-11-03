/** Express router providing word related routes
 * @module routes/wordRouter
 * @requires express
 * @requires validate
 * @requires sanitizer
 * @requires sanitizerHelper
 * @requires validationResult
 * @requires wordController
 */
/* ------------ Requiring Packages ------------ */
/**
 * express module
 * @const
 * @namespace express
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
 * @type {Object}
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
 * @type {Object}
 * @namespace validationResult
 */
const {validationResult} = require('express-validator');


/**
 *  wordController object have functions to call the database to do words CURD operation.
 * @type {Object}
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
        //including the id of the word inside the body
        // req.body.id = req.params.id;
        const response = await wordController.putWordById(req.params.id, req.body);
        res.json(response).status(200);
    }
});

/**
 * module exports the router for words collections.
 * @exports
 * @type {Object}
 */
module.exports = route;
