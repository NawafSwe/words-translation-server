//user can have
//avatar url
//name
//roles []
/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas edited By ------------ */
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
   // avatarUrl: {type: String, required: true}
});
/* ------------ Creating Mongoose Model ------------ */
const User = mongoose.model('User', userSchema);
module.exports = User;



