/* ------------ Requiring Packages ------------ */
const express = require('express');
const route = express.Router();
const wordController = require('../controllers/wordController');

route.get('/', async (req, res) => {
    if (req.query.key && req.query.lang) {
        const response = await wordController.getWordByTranslation(req.query.key, req.query.lang);
        res.json(response).status(200);
    } else {
        const response = await wordController.getWords();
        res.json(response).status(200);
    }
});

route.post('/', async (req, res) => {
    const response = await wordController.postWord(req.body);
    res.json(response).status(200);
});

route.delete('/:id', async (req, res) => {
    const response = await wordController.deleteWord(req.params.id);
    res.json(response).status(200);
});

route.get('/:id', async (req, res) => {
    const response = await wordController.getWordById(id);
    res.json(response).status(200);

});

module.exports = route;
