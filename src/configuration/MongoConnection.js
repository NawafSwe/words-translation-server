/* ------------ Requiring Packages ------------ */
const mongoose = require('mongoose');
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

module.exports = connect;
