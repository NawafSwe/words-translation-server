/* ---------- Importing Packages ---------- */
const Word = require('../models/word');
const translationHelper = require('../helpers/wordsHelperFunctions');

/* ------------------- Functions ------------------- */
/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name getWords.
 * @returns {Promise<Response>} response contains all words with its translations from the database.
 * @throws {Error} may throw an error if failuer occuured.
 * @description get all words with its translations from the database.
 */
const getWords = async () => {
    try {
        //return unDeleted words
        const response = await Word.find({});
        return response;
    } catch (error) {
        console.log(`error happened at getWords() error: ${error}`);
    }
};
/** @author Nawaf Alsharqi.
 * @exports
 * @async
 * @function
 * @name postWord.
 * @param {Object} body contains the data about the word.
 * @returns {Promise<Object>} returns the object that added to the database.
 * @throws {Error} throws an error during the process if there is an error.
 * @description posting new word to the database.
 */
const postWord = async (body) => {
    try {
        //extracting the data to format everything.
        const wordKey = body.key;
        const translations = body.translations;
        const editsData = body.edits;
        const timestamp = editsData.timestamp;
        const editor = editsData.editor;
        const response = await Word.create({key: wordKey, translations: translations});
        //forming the edits version
        editsData.version = await translationHelper.versionFormatter(wordKey, editor, timestamp, translations);
        await response.edits.push(editsData);
        await response.save();
        //returning the word with its data
        return response;
    } catch (error) {
        console.log(`error happened in word controller at postWord() error: ${error}`);
    }
}
/** @author Nawaf Alsharqi.
 * @exports
 * @async
 * @function
 * @name deleteWord.
 * @param {String} id of the word.
 * @returns {Promise<Object>} returns the deleted word from the database.
 * @throws {Error} throws an error if there is an error.
 * @description delete a word from the database.
 */
const deleteWord = async (id) => {
    try {
        //marking the word as deleted in the database
        const response = await Word.findById(id, {deleted: true});
        return response;

    } catch (error) {
        console.log(`error happened at deleteWord() during deleting the word with id : ${id} error: ${error}`);
    }
};
/** @author Nawaf Alsharqi.
 * @exports
 * @async
 * @function
 * @name getWordById.
 * @param {String} id of the word.
 * @returns {Promise<Object>} returns a word from the database.
 * @throws {Error} throws an error if there is an error.
 * @description get word from the database by id.
 */
const getWordById = async (id) => {
    try {
        const response = await Word.findById(id);
        return response;

    } catch (error) {
        console.log(`error happened getWordById() during getting the word with id : ${id} error: ${error}`);
    }
}

/** @author Nawaf Alsharqi.
 * @exports
 * @async
 * @function
 * @name putWordById.
 * @param {String} id of the word.
 * @returns {Promise<Object>} returns the updated word from the database.
 * @throws {Error} throws an error if there is an error.
 * @description update a word from the database by id.
 */
const putWordById = async (id, body) => {
    try {
        const response = await Word.findByIdAndUpdate(id, body);
        return response;
    } catch (error) {
        console.log(`error ouccurred in wordController at putWordById error ${error}`);
    }
}

/* ---------- Exporting Functions ---------- */
module.exports = {
    getWords,
    postWord,
    deleteWord,
    getWordById,
    putWordById,
};
