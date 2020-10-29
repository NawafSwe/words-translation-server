/* ---------- Importing Packages ---------- */
const Word = require('../models/word');
const translationHelper = require('../helpers/wordsHelperFunctions');

const getWords = async () => {
    try {
        const response = await Word.find({});
        return response;
    } catch (error) {
        console.log(`error happened at getWords() ${error}`);
    }
}
const postWord = async (body) => {
    try {
        const response = await Word.create(body);
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
const getWordByTranslation = async (key, lang) => {
    try {
        const response = await Word.findOne({key: key});
        const foundList = response.translations;
        const filteredArray = await translationHelper.filter(foundList, lang);
        return filteredArray;

    } catch
        (error) {
        console.log(`error happened at getWordByTranslation() error: ${error}`);
    }
}

module.exports = {getWords, postWord, deleteWord, getWordById, getWordByTranslation};
