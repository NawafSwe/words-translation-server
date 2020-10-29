/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');

/* ------------ Creating Schemas ------------ */
const wordSchema = mongoose.Schema({
    key: {type: String, required},
    translations: [],
});
/* ------------ Creating Word Model ------------ */
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
