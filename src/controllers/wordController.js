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

module.exports = {getWords, postWord, deleteWord, getWordById, getWordByTranslation, putWordById, putWordTranslation};
