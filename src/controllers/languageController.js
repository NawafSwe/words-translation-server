/* ---------- Importing Packages ---------- */
const Language = require('../models/language');

/* ------------------- Functions ------------------- */
/** @author Nawaf Alsharqi
 * @async
 * @function
 * @name getLanguages
 * @returns {Promise<Object>} returns array of languages objects
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
const getLanguageByCode = async (code) => {
    try {
        const response = await Language.find({code: code});
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at getLanguageByCode() error: ${error}`);
    }
}

const putLanguage = async (id, body) => {
    try {
        const response = await Language.findById(id, body);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at putLanguage() error: ${error}`);
    }
}
const deleteLanguage = async (id) => {
    try {
        const response = await Language.findByIdAndRemove(id);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at deleteLanguage() error: ${error}`);
    }
}

const getLanguageById = async (id) => {
    try {
        const response = await Language.findById(id);
        return response;

    } catch (error) {
        console.log(`error occurred in languageController at getLanguageById() error: ${error}`);
    }
}

/* ---------- Exporting Functions ---------- */
/**
 * * A module that control language collection from the database.
 * @exports {{deleteLanguage: (function(id): Promise<Object>),
 * getLanguages: (function(): Promise<Object>),
 * putLanguage: (function(id, body): Promise<Object>),
 * getLanguageById: (function(id): Promise<Object>),
 * getLanguageByCode: (function(code): Promise<Object>)}}
 */
module.exports = {
    getLanguages, getLanguageByCode,
    putLanguage, deleteLanguage,
    getLanguageById
};