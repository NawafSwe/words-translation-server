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
 * @name upsertWord.
 * @param {Object} body contains the data about the word.
 * @returns {Promise<Object<Word>>} returns the object that added to the database.
 * @throws {Error} throws an error during the process if there is an error.
 * @description posting or updating a word to the database.
 */
const upsertWord = async (body) => {
    //change the process using the id if found update otherwise create
    try {
        //extracting the data to format everything.
        const editsData = body.edits;
        const timestamp = editsData.timestamp;
        const editor = editsData.editor;
        const wordKey = body.key ? body.key : null;
        const translations = body.translations;
        const isFound = await Word.findById(body.id);
        //it may included in the put or post  body or not so we want to check

        let wordStatus = body.status ? body.status : null;
        if (isFound) {
            //if the word key not null means user wants to update it otherwise keep it.
            isFound.key = wordKey === null ? isFound.key : wordKey;
            //commit changes
            await isFound.save();
            //if the status of the word changes
            isFound.status = wordStatus === null ? isFound.status : wordStatus;
            //commit changes
            await isFound.save();
            //extract old translations
            const oldTranslation = isFound.translations;
            //merging old translations with the new translations
            //if there is two keys matchs ... the new one will replace the old one.
            const updatedTranslation = {...oldTranslation, ...body.translations};
            //updating the translations
            isFound.translations = updatedTranslation;
            //commit changes
            await isFound.save();
            //forming the edits version for old version
            editsData.version = await translationHelper.versionFormatter(isFound.key, editor, timestamp, updatedTranslation, isFound.status);
            //push it to edits
            await isFound.edits.push(editsData);
            //commits changes
            await isFound.save();
            return isFound;

        } else {
            //if word not found in db means creates new one
            //re-inital the word status to not approved because it is null , and making sure it is null or not
            wordStatus = wordStatus === null ? 'Not Approved' : wordStatus;
            const response = await Word.create({key: wordKey, translations: translations, status: wordStatus});
            //forming the edits version
            editsData.version = await translationHelper.versionFormatter(wordKey, editor, timestamp, translations, wordStatus);
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
 * @type {{getWordById: (function(String): Promise<Object<Word>>), upsertWord: (function(Object): Promise<Object<Word>>), deleteWord: (function(String): Promise<Object<Word>>), getWords: (function(): Promise<*|undefined>), putWordById: (function(String, *): Promise<Object<Word>>)}}
 */
module.exports = {
    getWords,
    upsertWord,
    deleteWord,
    getWordById,
    putWordById,
};
