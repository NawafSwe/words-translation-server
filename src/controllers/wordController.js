/**
 * The functionalities of the word collection.
 * @module controllers/wordController
 * @requires Word
 * @requires translationHelper
 */
/* ---------- Importing Packages ---------- */
/**
 * Word mongoose collection.
 * @type {Object<Word>}
 * @const
 * @namespace Word
 */
const Word = require('../models/word');

/**
 * translation helper that have function to format the version object
 * @type {Object}
 * @const
 * @namespace translationHelper
 */
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
 * @async
 * @function
 * @name postWord.
 * @param {Object} body contains the data about the word.
 * @returns {Promise<Object>} returns the object that added to the database.
 * @throws {Error} throws an error during the process if there is an error.
 * @description posting new word to the database.
 */
const postWord = async (body) => {
    //change the process using the id if found update otherwise create
    try {
        //checking if the word is pre-exist in the db or not
        if (body.id) {
            console.log(`id here ${id}`);
            return null;
        } else {
            //if id not included means the request was post request
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
        }

    } catch (error) {
        console.log(`error happened in word controller at postWord() error: ${error}`);
    }
}
/** @author Nawaf Alsharqi.
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

const putWordByKey = async (key, body) => {
    try {
        const response = await Word.find({key: key});
        //checking the content of the body

    } catch (error) {
        console.log(`error occurred in the wordController at putWordByKey() error: ${error}`);
    }
}

/* ---------- Exporting Functions ---------- */
/**
 * A module contains all functions have the controlls of word collection in the database
 * @exports
 * @type{{getWordById: (function(String): Promise<Object>),
 * postWord: (function(Object): Promise<Object>),
 * deleteWord: (function(String): Promise<Object>),
 * getWords: (function(): Promise<Response>),
 * putWordById: (function(String, *=): Promise<Object>)}}
 */
module.exports = {
    getWords,
    postWord,
    deleteWord,
    getWordById,
    putWordById,
};
