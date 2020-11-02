/**
 * The data-layer for a Language
 * @module language
 */
/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas edited By ------------ */

/**
 * Language schema
 * @constructor Language
 */
const languageSchema = mongoose.Schema({
    //title: language title such saudi arabia
    title: {type: String, require: true},
    //code: code of the language such ar stands for saudi arabia
    code: {type: String, require: true},
    //either 'ltr' or 'rtl' : left to right or right to left
    direction: {type: String, require: true}
});
/* ------------ Creating Mongoose Model ------------ */
const Language = mongoose.model('Language', languageSchema);
/* ---------- Exporting Model ---------- */
/**
 * module for Language collection.
 * @exports Language mongoDB Model
 */
module.exports = Language;

