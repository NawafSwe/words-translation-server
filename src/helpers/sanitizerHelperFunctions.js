/* ------------ Functions------------ */
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name sanitizeWord
 * @param { Request<P, ResBody, ReqBody, ReqQuery>} req request holds the body to be sanitized
 * @returns {VoidFunction} returns void.
 * @description sanitizing the body of a request
 */
const sanitizeWord = async (req) => {
    try {
        req.body.key = req.sanitize(req.body.key);
        req.body.edits.editor = req.sanitize(req.body.edits.editor);
        for (let [key, value] of Object.entries(req.body.translations)) {
            //sanitizing all values of translated word
            req.body.translations[key] = req.sanitize(req.body.translations[key]);
        }
    } catch (error) {
        console.log(`error occurred in the SanitizerHelpers at sanitizeWord() error: ${error}`);
    }
}
const sanitizeLanguage = async (req) => {
}
module.exports = {sanitizeWord, sanitizeWord};
