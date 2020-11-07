/**
 *  since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 * will goes into the switch case as a case.
 * @module utils/Language
 * @requires body
 * @requires param
 * @requires validateSchema
 */

/**
 * body and param of type express validator module to check the request param and body
 * @type {Object}
 * @const
 * @namespace body
 * @namespace param
 * @namespace check
 */
const {body, param, check} = require('express-validator');

/**
 * Object that holds functions to validate request schema and queries of giving request
 * @type {Object}
 * @const
 * @namespace validateSchema
 */
const validateSchema = require('./validateSchema');

//checking left to right or right to left


/** @author Nawaf Alsharqi.
 * @function
 * @name validate
 * @param {String} method name of the case to determine which validation we go with.
 * @return {Object} returns object that contains info about request if it has an error or not
 * @throws {Error} throws an error if there is an error.
 * @description validate request before miss with the database.
 */

const validate = (method) => {
    switch (method) {
        case 'getLanguages': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (validateSchema(schemas, req)) {
                        return true;
                    }

                }),
                /* ------------------- End Schema Validation ------------------- */
            ];
        }
        case 'getLanguageById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (validateSchema(schemas, req)) {
                        return true;
                    }

                }),
                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- Id Validation ------------------- */
                param('id').isMongoId(),
                /* ------------------- End Id Validation ------------------- */
            ];
        }
        case 'postLanguage': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = ['title', 'code', 'direction'];

                        if (validateSchema(schemas, req)) {
                            return true;
                        }
                    }),

                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- direction Validation ------------------- */
                body('direction', 'direction must exits and be of type string').exists().isString(),
                body('direction', 'direction cannot be empty string').not().isEmpty(),
                body('direction', 'direction cannot be empty string').not().equals(' '),
                check('direction', 'direction must have value of ltr or rtl only').isIn(['ltr', 'rtl']),
                /* ------------------- End direction Validation ------------------- */

                /* ------------------- title Validation ------------------- */
                body('title', 'title must exits and be of type string').exists().isString(),
                body('title', 'title cannot be empty string').not().isEmpty(),
                body('title', 'title cannot be empty string').not().equals(' '),

                /* ------------------- End Of title Validation ------------------- */

                /* ------------------- code Validation ------------------- */
                body('code', 'code must exits and be of type string').exists().isString(),
                body('code', 'code cannot be empty string').not().isEmpty(),
                body('code', 'code cannot be empty string').not().equals(' '),

                /* ------------------- End Of code Validation ------------------- */


            ];
        }

        case 'putLanguageById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = ['title', 'code', 'direction'];

                        if (validateSchema(schemas, req)) {
                            return true;
                        }
                    }),

                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- Id Validation ------------------- */
                param('id').isMongoId(),
                /* ------------------- End Id Validation ------------------- */

                /* ------------------- direction Validation ------------------- */
                body('direction', 'direction must exits and be of type string').optional().isString(),
                body('direction', 'direction cannot be empty string').not().isEmpty(),
                body('direction', 'direction cannot be empty string').not().equals(' '),
                check('direction', 'direction must have value of ltr or rtl only').isIn(['ltr', 'rtl']),
                /* ------------------- End direction Validation ------------------- */

                /* ------------------- title Validation ------------------- */
                body('title', 'title must exits and be of type string').optional().isString(),
                body('title', 'title cannot be empty string').not().isEmpty(),
                body('title', 'title cannot be empty string').not().equals(' '),

                /* ------------------- End Of title Validation ------------------- */

                /* ------------------- code Validation ------------------- */
                body('code', 'code must exits and be of type string').optional().isString(),
                body('code', 'code cannot be empty string').not().isEmpty(),
                body('code', 'code cannot be empty string').not().equals(' '),

                /* ------------------- End Of code Validation ------------------- */


            ];
        }

        case 'deleteLanguageById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (validateSchema(schemas, req)) {
                        return true;
                    }

                }),
                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- Id Validation ------------------- */
                param('id').isMongoId(),
                /* ------------------- End Id Validation ------------------- */
            ];
        }
    }
}

module.exports = validate;


