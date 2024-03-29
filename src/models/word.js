/**
 * The data-layer for a Word
 * @module word
 */

/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas edited By ------------ */
// later we can support orgs as => org : {ref org collection}
/**
 * Word schema , also contains edits.
 * @constructor Word
 */
const wordSchema = mongoose.Schema({
    //key: represents the main word itself
    key: {type: String, require: true},
    //edits: save olds edits of particular word
    edits: [{
        //editor: which is the user who edited the key
        editor: {type: String,},
        //version: which is the copy of the translation
        version: {type: Object},
        //timestamp: which is the time was edited
        timestamp: {type: Number}
    }],
    //translations: object that holds the word and its translations for example en : nawaf
    translations: {type: Object},
    // deleted: boolean value too keep track of the data we won't delete
    deleted: {type: Boolean, default: false},
    //status: string value represents the status of the word
    status: {type: String, default: 'Approved'},
});
/* ------------ Creating Word Model ------------ */
const Word = mongoose.model('Word', wordSchema);
/* ---------- Exporting Model ---------- */
/**
 * module for Word collection.
 * @exports
 * @type {Object<Word>}
 */
module.exports = Word;
