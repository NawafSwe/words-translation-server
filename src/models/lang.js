/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas edited By ------------ */

const langSchema = mongoose.Schema({
    //title: language title such saudi arabia
    title: {type: String, require: true},
    //code: code of the language such ar stands for saudi arabia
    code: {type: String, require: true},
    //either 'ltr' or 'rtl' : left to right or right to left
    direction: {type: String, require: true}
});
/* ------------ Creating Mongoose Model ------------ */
const Lang = mongoose.model('Lang', langSchema);
/* ---------- Exporting Model ---------- */
module.exports = Lang;

