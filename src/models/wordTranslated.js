/* ---------- Importing Packages ---------- */
const mongoose = require('mongoose');

/* ------------ Creating Schemas ------------ */
const wordTranslated = mongoose.Schema({
    word: {type: String, require: true},
    lang: {type: String, require: true}
});
/* ------------ Creating Word Model ------------ */
const WordTranslated = mongoose.model('WordTranslated', wordTranslated);
module.exports = WordTranslated;
