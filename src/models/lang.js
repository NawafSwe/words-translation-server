const mongoose = require('mongoose');
const langSchema = mongoose.Schema({
    title: {type: String, require: true},
    code: {type: String, require: true},
    //either ltr or rtl : left to right or right to left
    direction: {type: String, require: true}

});
const Lang = mongoose.model('Lang', langSchema);
module.exports = Lang;
