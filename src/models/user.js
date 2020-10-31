//user can have
//avatar url
//name
//roles []
/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
/* ------------ Creating Schemas ------------ */
const userSchema = mongoose.Schema({
    //name: name of the user
    name: {type: String, required: true},
    //avatarUrl: avatar picture for a user
    // avatarUrl: {type: String, required: true}
});
/* ------------ Creating Mongoose Model ------------ */
const User = mongoose.model('User', userSchema);
/* ---------- Exporting Model ---------- */
module.exports = User;



