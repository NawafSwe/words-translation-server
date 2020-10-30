/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');

/* ------------ Creating Schemas edited By ------------ */
//org : {ref org collection}
const wordSchema = mongoose.Schema({
    //users
    key: {type: String, require: true},
    //ref to edit schema , first user is the first edited which is the creator
    //try to do it like this , how to use shcema in same schema
    //edit object
    edits: [{
        editor: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        //acts as copy
        version: {},
        timestamp: {type: Number}
    }],
    //make it one object
    translations: {
        //for example
        //en : nawaf

    },
    // too keep track of the data we won't delete
    deleted: {type: Boolean, default: false}
});
/* ------------ Creating Word Model ------------ */
const Word = mongoose.model('e', wordSchema);
module.exports = Word;

// object edit
// {
//     editor : {refUser},
//     timestamp : {type:number},
//     version : {body of the new word}
// }

//dummy data
/*
* { key : str
*   edit: [],
*   translation: {langId : hadi  }
*
*
* }
*
* */
