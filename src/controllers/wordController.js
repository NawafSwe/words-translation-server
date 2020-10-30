/* ---------- Importing Packages ---------- */
const Word = require('../models/word');
const translationHelper = require('../helpers/wordsHelperFunctions');
const wordTranslatedController = require('../controllers/wordTranslatedController');

const getWords = async () => {
    try {
        const response = await Word.find({}).populate('translations');
        return response;
    } catch (error) {
        console.log(`error happened at getWords() ${error}`);
    }
}
const postWord = async (body) => {
    const key_from_body = {key: body.key}
    try {
        const response = await Word.create(key_from_body);
        if (body.translation) {
            const translation = await wordTranslatedController.postTranslation(body.translation);
            await response.translations.push(translation);
            await response.save();
        }
        return response;
    } catch (e) {
        console.log(`error happened in word controller at postWord() ${error}`);
    }
}

const deleteWord = async (id) => {
    try {
        const response = await Word.findByIdAndDelete(id).populate('translations');
        return response;

    } catch (error) {
        console.log(`error happened at deleteWord() during deleting the word with id : ${id} error: ${error}`);
    }
}
const getWordById = async (id) => {
    try {
        const response = await Word.findById(id).populate('translations');
        return response;

    } catch (error) {
        console.log(`error happened getWordById() during getting the word with id : ${id} error: ${error}`);
    }
}
const getWordByTranslation = async (key, lang) => {
    try {
        const response = await Word.findOne({key: key}).populate('translations');
        const foundList = await response.translations;
        const foundTranslatedWord = await translationHelper.filter(foundList, lang);
        return {
            id: response.id,
            word: foundTranslatedWord,
            key: key,
            lang: lang

        };
    } catch
        (error) {
        console.log(`error happened at getWordByTranslation() error: ${error}`);
    }
}

const getWordByKey = async (key) => {

};

const putWordById = async (id, body) => {
    try {
        const response = await Word.findById(id);
        if (body.key) {
            response.key = await body.key;
            await response.save();
        }
        return response;
    } catch (error) {
        console.log(`error ouccurred in wordController at putWordById error ${error}`);
    }
}

const putWordTranslation = async (wordId, translationId, body) => {
    try {
        const getTranslatedWord = await wordTranslatedController.putTranslation(translationId, body);
        const getWord = await Word.findById(wordId).populate('translations');
        return getWord;

    } catch (error) {
        console.log(`error occurred in the Word Controller at putWordTranslation error : ${error}`);
    }
}

const deleteWordTranslation = async (wordId, translationId) => {
    try {
        const deletedWord = await wordTranslatedController.deleteTranslation(translationId);
        //returning response after deletaion;
        const response = await Word.findById(wordId);
        return response;
    } catch (error) {
        console.log(`error ouccrred in wordController at deleteWordTranslation error ${error}`);
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
 * @description post new word translation to the database
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
    getWordByTranslation,
    putWordById,
    putWordTranslation,
    deleteWordTranslation,
    postWordTranslation
};
