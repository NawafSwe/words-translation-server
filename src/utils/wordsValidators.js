/**
 *  since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 * will goes into the switch case as a case.
 * @module utils/wordsValidators
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
 */
const {body, param} = require('express-validator');
/**
 * Object that holds functions to validate request schema and queries of giving request
 * @type {Object}
 * @const
 * @namespace validateSchema
 */
const validateSchema = require('./checkSchema');


/** @author Nawaf Alsharqi.
 * @function
 * @name validate
 * @param {String} method name of the case to determine which validation we go with.
 * @throws {Error} throws an error if there is an error.
 * @description validate request before miss with the database.
 */
const validate = (method) => {
    switch (method) {

        case 'getWords': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = [undefined];
                        if (validateSchema(schemas, req)) {
                            return true;
                        }
                    }),
                /* ------------------- End Of Schema Validation ------------------- */
            ];
        }
        case 'getWordById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = [undefined];
                        if (validateSchema(schemas, req)) {
                            return true;
                        }
                    }),
                /* ------------------- End Of Schema Validation ------------------- */

                /* ------------------- ID Validation ------------------- */
                param('id', 'id must be valid mongo id').exists().isMongoId()
                /* -------------------END OF ID Validation ------------------- */
            ];

        }
        case 'deleteWordById': {
            /* ------------------- Schema Validation ------------------- */
            body(' ')
                .custom((value, {req}) => {
                    const schemas = [undefined];
                    if (validateSchema(schemas, req)) {
                        return true;
                    }
                })
            /* ------------------- End Of Schema Validation ------------------- */

            /* ------------------- ID Validation ------------------- */
            param('id', 'id must be valid mongo id').exists().isMongoId()
            /* -------------------END OF ID Validation ------------------- */
        }
        case 'postWord': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = ['key', 'edits', 'translations', 'status'];
                        if (validateSchema(schemas, req)) {
                            return true
                        }
                    }),
                /* ------------------- End Of Schema Validation ------------------- */

                /* ------------------- Key Validation ------------------- */
                //trim().escape() will sanitize the body but will not keep the text
                body('key', 'status must be exits and of type string').exists().isString(),
                body('key', 'key cannot be empty string').not().equals(''),
                body('key', 'key cannot be empty string').not().equals(' '),

                /* ------------------- End Of Key Validation ------------------- */

                /* ------------------- Status Validation ------------------- */
                body('status', 'status must be of type string').optional().isString(),
                body('status', 'status cannot be empty string').optional().not().isEmpty(),
                body('status', 'status cannot be empty').optional().not().equals(' '),
                /* ------------------- End Of status Validation ------------------- */


                /* ------------------- Edits Validation ------------------- */
                body('edits.editor', 'editor field must be exist and valid mongo Id').exists().isMongoId(),
                body('edits.timestamp', 'timestamp must be exist and of type number').exists().isNumeric(),
                /* ------------------- End Of Edits Validation ------------------- */

                /* ------------------- Translations Validation ------------------- */
                body('translations')
                    .optional()
                    .custom((translationValues, {req}) => {
                        for (let value of Object.values(translationValues)) {
                            if (typeof value != 'string') {
                                throw new Error('value of a translated word must be string');
                            }
                        }
                        return true;
                    }),
                /* ------------------- End Of Translations Validation ------------------- */

            ];
        }
        case 'putWordById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = ['key', 'edits', 'translations', 'status'];
                    if (validateSchema(schemas, req)) {
                        return true
                    }
                }),
                /* ------------------- End Of Schema Validation ------------------- */
                /* ------------------- ID Validation ------------------- */
                param('id', 'id must be a valid mongo id').exists().isMongoId(),
                /* -------------------END OF ID Validation ------------------- */

                /* ------------------- Key Validation ------------------- */
                //trim().escape() will sanitize the body but will not keep the text
                body('key', 'key cannot be empty string').optional().not().equals(''),
                body('key', 'key cannot be empty string').optional().not().equals(' '),
                /* ------------------- End Of Key Validation ------------------- */

                /* ------------------- Status Validation ------------------- */
                body('status', 'status must be of type string').optional().isString(),
                body('status', 'status cannot be empty string').optional().not().isEmpty(),
                body('status', 'status cannot be empty').optional().not().equals(' '),
                /* ------------------- End Of status Validation ------------------- */


                /* ------------------- Edits Validation ------------------- */
                body('edits.editor', 'editor field must be exist and valid mongo Id').exists().isMongoId(),
                body('edits.timestamp', 'timestamp must be exist and of type number').exists().isNumeric(),
                /* ------------------- End Of Edits Validation ------------------- */

                /* ------------------- Translations Validation ------------------- */
                body('translations')
                    .optional()
                    .custom((translationValues, {req}) => {
                        for (let value of Object.values(translationValues)) {
                            if (typeof value != 'string') {
                                throw new Error('value of a translated word must be string');
                            }
                        }
                        return true;
                    }),
                /* ------------------- End Of Translations Validation ------------------- */

            ];
        }
    }
};
/* ------------------- Exporting Function ------------------- */
/**
 * module that exports a function to validate word collection requests
 * @exports
 * @type {function(String): ([this]|[this, this]|*)}
 */
module.exports = validate;
