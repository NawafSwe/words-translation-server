/* ---------- Importing Packages ---------- */
const WordTranslated = require('../models/wordTranslated');
const postTranslation = async (body) => {
    try {
        const response = await WordTranslated.create(body);
        return response;

    } catch (error) {
        console.log(`error occurred in the wordTranslatedController at postTranslation() error: ${error}`);
    }
};
const putTranslation = async (id, body) => {
    try {
        const response = await WordTranslated.findByIdAndUpdate(id, body);
        return response;
    } catch (error) {
        console.log(`error occurred in wordTranslatedController at putTranslation ${error} `);
    }
}
module.exports = {postTranslation, putTranslation};
