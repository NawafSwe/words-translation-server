/* ---------- Importing Packages ---------- */
const WordTranslated = require('../models/wordTranslated');

const getTranslations = async () => {
    try {
        const response = await WordTranslated.find({});
        return response;
    } catch (error) {
        console.log(`error occurred in the wordTranslatedController at getTranslations error ${error}`);
    }
};
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

};

const getTranslationById = async(id)=>{
    try{

    }catch (error){

    }
}
const deleteTranslation = async (id) => {
    try {
        const response = await WordTranslated.findByIdAndRemove(id);
        return response;
    } catch (error) {
        console.log(`errro occurred at WordTranslatedController at deleteTranslation error : ${error}`);
    }
};
module.exports = {postTranslation, putTranslation, deleteTranslation, getTranslations};
