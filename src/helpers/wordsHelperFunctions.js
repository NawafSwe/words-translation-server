/**
 * The functionalities of formatting a body for word collection.
 * @module helpers/wordsHelperFunctions
 */
/* ------------------- Functions ------------------- */

/** @author Nawaf Alsharqi
 * @exports
 * @async
 * @function
 * @name versionFormatter.
 * @param {String} wordKey the word key.
 * @param {String} editor id of the editor.
 * @param {Number} timestamp time for the editing.
 * @param {Object} translations data about the world for each language.
 * @returns {Promise<Object>} formatted javaScript object.
 * @throws {Error} throws an error if there is an error.
 * @description formatting version object.
 */
const versionFormatter = async (wordKey, editor, timestamp, translations) => {
    try {
        return {
            key: wordKey,
            edits: {
                editor: editor,
                timestamp: timestamp,
            },
            translations: translations
        };
    } catch (error) {
        console.log(`error occurred in the wordHelpersFunctions error: ${error}`);
    }
}
/* ---------- Exporting Functions ---------- */
/**
 * module exports function format the version of word update.
 * @exports
 * @type {{versionFormatter: (function(String, String, Number, Object): Promise<Object>)}}
 */
module.exports = {versionFormatter};
