/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');

/* ------------------- Functions ------------------- */
/** @author Nawaf Alsharqi
 * @exports
 * @async
 * @function
 * @name connect
 * @param {String} uri of the database
 * @returns {VoidFunction} void functions.
 * @throws {Error} throws an error if the database connection went wrong.
 * @description connect to the database.
 */
const connect = (uri) => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }, (error, db) => {
            if (error) {
                console.log(`error happened during connecting to the database error: ${error}`);
            }
            console.log(`successfully connected to the database`);
        });

    } catch (error) {
        console.log(`error happened during connection to the database error : ${error}`);
    }
};
/* ------------------- Exporting Function ------------------- */
module.exports = connect;
