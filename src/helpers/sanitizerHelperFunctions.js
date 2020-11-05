/**
 * The functionalities of sanitizing request.
 * @module helpers/sanitizerHelperFunctions
 */

/* ------------ Functions------------ */
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name sanitizeWord
 * @param { Request<P, ResBody, ReqBody, ReqQuery>} req request holds the body to be sanitized
 * @returns {VoidFunction} returns void.
 * @description sanitizing the body of a request if it is contains scripts will remove it
 */
const sanitizeWord = async (req) => {
    try {
        // checking the content of the request to avoid errors
        if (req.body.key) {
            req.body.key = req.sanitize(req.body.key);
        }
        if (req.body.edits) {
            if (req.body.edits.editor) {
                req.body.edits.editor = req.sanitize(req.body.edits.editor);
            }
            if (req.body.translations) {
                for (let [key, value] of Object.entries(req.body.translations)) {
                    //sanitizing all values of translated word
                    req.body.translations[key] = req.sanitize(req.body.translations[key]);
                }
            }
        }
    } catch (error) {
        console.log(`error occurred in the SanitizerHelpers at sanitizeWord() error: ${error}`);
    }
}
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name sanitizeLanguage
 * @param { Request<P, ResBody, ReqBody, ReqQuery>} req request holds the body to be sanitized
 * @returns {VoidFunction} returns void.
 * @description sanitizing the body of a request if it is contains scripts will remove it
 */
const sanitizeLanguage = async (req) => {
    try {
        if (req.body.title) {
            req.body.title = req.sanitize(req.body.title);
        }
        if (req.body.code) {
            req.body.code = req.sanitize(req.body.code);
        }
        if (req.body.direction) {
            req.body.direction = req.sanitize(req.body.direction);
        }

    } catch (error) {
        console.log(`error occurred in the SanitizerHelpers at sanitizeLanguage() error: ${error} `);
    }
}
/**
 * module that exports sanitizers functions for requests.
 * @exprts
 * @type {{sanitizeWord: (function(Request<P, ResBody, ReqBody, ReqQuery>): VoidFunction),
 * sanitizeLanguage: (function(Request<P, ResBody, ReqBody, ReqQuery>): VoidFunction)}}
 */
module.exports = {sanitizeWord, sanitizeLanguage};
