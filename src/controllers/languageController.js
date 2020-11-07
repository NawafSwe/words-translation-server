/**
 * The functionalities of the language collection.
 * @module controllers/languageController
 * @requires Language
 */

/* ---------- Importing Packages ---------- */
/**
 * Language mongoose collection.
 * @type {Object<Language>}
 * @const
 * @namespace Language
 */

const Language = require('../models/language');

//make direction all lowercase.
/* ------------------- Functions ------------------- */
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getLanguages
 * @returns {Promise<Array<Language>>} returns array of languages objects
 * @throws {Error} throws an error if there is an error
 * @description getting all languages from the database
 */
const getLanguages = async () => {
    try {
        const response = await Language.find({});
        return response;
    } catch (error) {
        console.log(`error occurred in the languageController at getLanguages() error: ${error}`);
    }
};
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getLanguageByCode
 * @param {String} code of the language ar
 * @returns {Promise<Object<Language>>} returns the language by code from the database.
 * @throws {Error} throws an error if there is an error
 * @description getting language from the database by code
 */

const getLanguageByCode = async (code) => {
    try {
        const response = await Language.findOne({code: code});
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at getLanguageByCode() error: ${error}`);
    }
}
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name putLanguage
 * @param {String} id id of the object
 * @param {Object} body contains the data of language.
 * @returns {Promise<Object<Language>>} returns the updated Object of language
 * @throws {Error} throws an error if there is an error
 * @description updating language object by id from the database
 */

const putLanguage = async (id, body) => {
    try {
        const response = await Language.findById(id, body);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at putLanguage() error: ${error}`);
    }
}

/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name deleteLanguage
 * @param {String} id id of the object
 * @returns {Promise<Object<Language>>} returns the deleted Object of language from the database
 * @throws {Error} throws an error if there is an error
 * @description deleting language object by id from the database
 */

const deleteLanguage = async (id) => {
    try {
        const response = await Language.findByIdAndRemove(id);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at deleteLanguage() error: ${error}`);
    }
}
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getLanguageById
 * @param {String} id id of the object
 * @returns {Promise<Object<Language>>} returns the Object of language from the database by id
 * @throws {Error} throws an error if there is an error
 * @description getting language object by id from the database
 */

const getLanguageById = async (id) => {
    try {
        const response = await Language.findById(id);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at getLanguageById() error: ${error}`);
    }
}


/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name deleteLanguage
 * @param {Object} body contains the data of language.
 * @returns {Promise<Object<Language>>} returns the deleted Object of language from the database
 * @throws {Error} throws an error if there is an error
 * @description posting language object to the database
 */
const postLanguage = async (body) => {
    try {
        //making sure the code of language and direction are in small caps
        body.direction = body.direction.toLowerCase();
        body.code = body.code.toLowerCase();
        const response = await Language.create(body);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at postLanguage() error: ${error}`);
    }
}

/* ---------- Exporting Functions ---------- */
/**
 * A module that control language collection from the database.
 * @exports
 * @type {{postLanguage: (function(Object): Promise<Object<Language>>),
 * deleteLanguage: (function(String): Promise<Object<Language>>),
 * getLanguages: (function(): Promise<Array<Language>>),
 * putLanguage: (function(String, Object): Promise<Object<Language>>),
 * getLanguageById: (function(String): Promise<Object<Language>>),
 * getLanguageByCode: (function(String): Promise<Object<Language>>)}}
 */
module.exports = {
    getLanguages, getLanguageByCode,
    putLanguage, deleteLanguage,
    getLanguageById,
    postLanguage
};
