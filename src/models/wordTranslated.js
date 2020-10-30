/* ---------- Importing Packages ---------- */
const mongoose = require('mongoose');

/* ------------ Creating Schemas ------------ */
const translatedWord = mongoose.Schema({
    //translatedWord
    word: {type: String, require: true},
    lang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lang',
    }
});
/* ------------ Creating Word Model ------------ */
const TranslatedWord = mongoose.model('TranslatedWord', translatedWord);
module.exports = TranslatedWord;
