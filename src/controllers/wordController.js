/* ---------- Importing Packages ---------- */
const Word = require('../models/word');

const getWords = async () => {
    try {
        const response = await Word.find({});
        return response;
    } catch (error) {
        console.log(`error happened in getWords ${error}`);
    }
}
const postWord = async (body) => {
    try {
        const response = await Word.create(body);
        return response;
    } catch (e) {
        console.log(`error happened in word controller at postWord ${error}`);
    }
}

module.exports = {getWords, postWord};

