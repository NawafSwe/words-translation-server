/* ------------ Requiring Packages ------------ */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoConnection = require('./configuration/MongoConnection');

/* ------------ Choosing Env ------------ */
if (process.env.NODE === 'production' || process.env.NODE_ENV === 'staging') {
    require('custom-env').env(process.env.NODE_ENV);
} else {
    require('dotenv').config();
}
/* ------------ App Config ------------ */
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
/* ------------ Connecting to db ------------ */
mongoConnection(process.env.MONGO_URI);
/* ------------ Testing Backend ------------ */
app.get('/', async (req, res) => {
    res.send('works just fine').status(200);
});
/* ------------ Importing Routes ------------ */
const wordRouter = require('./routes/wordRouter');
const languageRouter = require('./routes/languageRouter');
app.use('/words', wordRouter);
app.use('/languages', languageRouter);

/* ------------ Establish Server Connection ------------ */
const PORT = process.env.PORT || 8800;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST);
console.log(`Server running on http://${HOST}:${PORT}`);
