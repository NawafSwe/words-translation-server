/* ---------- Importing Packages ---------- */
const express = require('express');
const route = express.Router();
const languageController = require('../controllers/languageController');
const sanitizer = require('express-sanitizer');
const sanitizerHelper = require('../helpers/sanitizerHelperFunctions');

/* ------------ Route Config ------------ */
route.use(sanitizer());


/* ---------- Routing ---------- */
route.get('/', async (req, res) => {
    const response = await languageController.getLanguages();
    res.json(response).status(200);
});

route.get('/:id', async (req, res) => {
    const response = await languageController.getLanguageById(req.params.id);
    res.json(response).status(200);
});

route.put('/:id', async (req, res) => {
    const response = await languageController.putLanguage(req.params.id, req.body);
    res.json(response).status(200);
});
route.delete('/:id', async (req, res) => {
    const response = await languageController.deleteLanguage(req.params.id);
    res.json(response).status(200);
});


module.exports = route;

