/* ---------- Importing Packages ---------- */
const Word = require('../models/word');
const translationHelper = require('../helpers/wordsHelperFunctions');

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getWords
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
        console.log(`error happened at getWords() ${error}`);
    }
}
const postWord = async (body) => {
    //sanitazing first the body
    const key_from_body = {key: body.key}
    try {
        const response = await Word.create(key_from_body);

        return response;
    } catch (e) {
        console.log(`error happened in word controller at postWord() ${error}`);
    }
}

const deleteWord = async (id) => {
    try {
        const response = await Word.findByIdAndDelete(id);
        return response;

    } catch (error) {
        console.log(`error happened at deleteWord() during deleting the word with id : ${id} error: ${error}`);
    }
}
const getWordById = async (id) => {
    try {
        const response = await Word.findById(id);
        return response;

    } catch (error) {
        console.log(`error happened getWordById() during getting the word with id : ${id} error: ${error}`);
    }
}


const putWordById = async (id, body) => {
    try {
        const response = await Word.findByIdAndUpdate(id, body);
        return response;
    } catch (error) {
        console.log(`error ouccurred in wordController at putWordById error ${error}`);
    }
}

const putWordTranslation = async (wordId, translationId, body) => {
    try {
        const getWord = await Word.findById(wordId).populate('translations');
        return getWord;

    } catch (error) {
        console.log(`error occurred in the Word Controller at putWordTranslation error : ${error}`);
    }
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name postWordTranslation
 * @param {String} wordId the word id
 * @param {Object} body contains the translation info
 * @returns {Promise<Response>} returns object that contains all information about the new data added to the database.
 * @throws {Error} may throws an error failure during the process of adding new word translation.
 * @description post new word translation to the database.
 */
const postWordTranslation = async (wordId, body) => {
    try {
        const getWord = await Word.findById(wordId).populate('translations');
        //creating a translation first in the db
        const newTranslation = await wordTranslatedController.postTranslation(body);
        await getWord.translations.push(newTranslation);
        await getWord.save();
        //returing word updated with its new translations
        return await getWordById(wordId);
    } catch (error) {
        console.log(`error occurred in wordContrller at postWordTranslation error : ${error}`);
    }

};
/* ---------- Exporting Functions ---------- */
module.exports = {
    getWords,
    postWord,
    deleteWord,
    getWordById,
    putWordById,
    putWordTranslation,
    postWordTranslation
};
