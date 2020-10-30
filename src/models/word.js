/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');

/* ------------ Creating Schemas edited By ------------ */
const wordSchema = mongoose.Schema({
    //users
    key: {type: String, require: true},
    //ref to edit schema , first user is the first edited which is the creator
    //try to do it like this , how to use shcema in same schema
    edits: [{ type: wordSchema }],
    //make it one object
    translations: {
        //for example

    },
    // too keep track of the data we won't delete
    deleted: {type: Boolean, default: false}
});
/* ------------ Creating Word Model ------------ */
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;

//edit schema
// {
//     editor : {refUser},
//     timestamp : {type:number},
//     version : {body of the new word}
// }

/*
* { key : str
*   edit: [],
*   translation: { key : hadi , langId : ar }
*
*
* }
*
* translation.langId === ar
* */
