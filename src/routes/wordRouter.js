/* ------------ Requiring Packages ------------ */
const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    res.send('word route hit').status(200);
});


module.exports = route;
