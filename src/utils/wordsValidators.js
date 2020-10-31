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
}
/* ------------------- Exporting Function ------------------- */
module.exports = validate;
