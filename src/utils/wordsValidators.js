/* ------------------- EXPLANATION -------------------
 since all the routes are following the RESTFUL API naming so based on the name of the function in the route
 will goes into the switch case as a case.
*/

const {body, param} = require('express-validator/check');
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
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (validateSchema(schemas, req)) {
                        return true;
                    }
                }),
                /* ------------------- End Of Schema Validation ------------------- */
            ];
        }
        case 'postWord': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = ['key', 'edits', 'translations', 'deleted'];
                    if (validateSchema(schemas, req)) {
                        return true
                    }
                }),
                /* ------------------- End Of Schema Validation ------------------- */


                /* ------------------- Key Validation ------------------- */
                body('key', 'key cannot be empty string').not().equals(''),
                body('key', 'key cannot be empty string').not().equals(' '),
                /* ------------------- End Of Key Validation ------------------- */

                /* ------------------- Edits Validation ------------------- */
                body('edits.editor', 'editor field must be valid mongo Id').isMongoId(),
                body('edits.timestamp', 'timestamp must be number').isNumeric(),
                /* ------------------- End Of Edits Validation ------------------- */

                /* ------------------- Translations Validation ------------------- */
                body('translations').custom((translationValues, {req}) => {
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
module.exports = validate;
