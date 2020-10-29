/* ------------ Requiring Packages ------------ */
const express = require('express');
const route = express.Router();
const wordController = require('../controllers/wordController');

route.get('/', async (req, res) => {
    const response = await wordController.getWords();
    res.send(response).status(200);
});

route.post('/', async (req, res) => {
    const response = await wordController.postWord(req.body);
    res.send(response).status(200);
});

route.delete('/:id', async (req, res) => {
    const response = await wordController.deleteWord(req.params.id);
    res.send(response).status(200);
});

route.get('/:id', async (req, res) => {
    const response = await wordController.getWordById(id);
    res.send(response).status(200);
});

module.exports = route;
