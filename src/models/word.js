/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas edited By ------------ */
//org : {ref org collection}
const wordSchema = mongoose.Schema({
    //key represents the main word itself
    key: {type: String, require: true},
    edits: [{
        //editor which is the user who edited the key
        editor: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        //version which is the copy of the translation
        version: {},
        //timestamp which is the time was edited
        timestamp: {type: Number}
    }],
    //translations is object that holds the word and its translations
    translations: {
        //for example
        //en : nawaf
    },
    // too keep track of the data we won't delete
    deleted: {type: Boolean, default: false}
});
/* ------------ Creating Word Model ------------ */
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;

