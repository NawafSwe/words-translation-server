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
 * @returns {Promise<Arra<<Word>>>} response contains all words with its translations from the database.
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
 * @returns {Promise<Object<Word>>} returns the object that added to the database.
 * @throws {Error} throws an error during the process if there is an error.
 * @description posting new word to the database.
 */
const postWord = async (body) => {
    //change the process using the id if found update otherwise create
    try {
        //checking if the word is pre-exist in the db or not
        if (body.id) {
            console.log(`id here ${body.id} and the hole body is \n ${body}`);
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
 * @returns {Promise<Object<Word>>}returns the deleted word from the database.
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
 * @returns {Promise<Object<Word>>} returns a word from the database.
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
 * @returns {Promise<Object<Word>>} returns the updated word from the database.
 * @throws {Error} throws an error if there is an error.
 * @description update a word from the database by id.
 */
const putWordById = async (id, body) => {
    try {
        const response = await Word.findById(id);
        //checking if user wants to updates the key or not
        const wordKey = body.key ? body.key : response.key;
        //extracting old translations
        const oldTranslation = response.translations;
        //merging old translations with the new translations
        //if there is two keys matchs ... the new one will replace the old one.
        const updatedTranslation = {...oldTranslation, ...body.translations};
        response.translations = updatedTranslation;
        await response.save();
        const editor = body.edits.editor;
        const timestamp = body.edits.timestamp;
        //const oldVersion = translationHelper.versionFormatter();

        return response;
    } catch (error) {
        console.log(`error ouccurred in wordController at putWordById error ${error}`);
    }
}

/* ---------- Exporting Functions ---------- */
/**
 * A module contains all functions have the controlls of word collection in the database
 * @exports
 * @type {{getWordById: (function(String): Promise<Object<Word>>), postWord: (function(Object): Promise<Object<Word>>), deleteWord: (function(String): Promise<Object<Word>>), getWords: (function(): Promise<*|undefined>), putWordById: (function(String, *): Promise<Object<Word>>)}}
 */
module.exports = {
    getWords,
    postWord,
    deleteWord,
    getWordById,
    putWordById,
};
