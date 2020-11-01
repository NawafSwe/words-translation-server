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
        //for case <script>key</script> it fails
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
const sanitizeLanguage = async (req) => {
    try {
        if (req.body.title) {
            req.body.title = req.sanitize(req.body.title);
        }

    } catch (error) {
        console.log(`error occurred in the SanitizerHelpers at sanitizeLanguage() error: ${error} `);
    }
}
module.exports = {sanitizeWord, sanitizeWord};
