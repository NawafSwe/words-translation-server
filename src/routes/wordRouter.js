/* ------------ Requiring Packages ------------ */
const express = require('express');
const route = express.Router();
const wordController = require('../controllers/wordController');
const sanitizer = require('express-sanitizer');

/* ------------ Route Config ------------ */
route.use(sanitizer());
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
    // req.body.key = req.sanitize(req.body.key);
    // //if translation included
    // if (req.body.translations) {
    //     req.body.translations.lang = req.sanitize(req.body.translations.lang);
    //     req.body.translations.lang = req.sanitize(req.body.translations.word);
    // }

    const response = await wordController.postWord(req.body);
    res.json(response).status(200);
});

route.delete('/:id', async (req, res) => {
    const response = await wordController.deleteWord(req.params.id);
    res.json(response).status(200);
});

route.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await wordController.getWordById(id);
    res.json(response).status(200);

});
route.put('/:id', async (req, res) => {
    //we need to agree on the process here if in the front-end who doing the call is he gonna pass only the new translation? or all and the new one
    //my approach will consider it as he gonna pass only one info about the translation list
    // req.body.key = req.sanitize(req.body.key);
    // //if translation included
    // if (req.body.translations) {
    //     req.body.translations.lang = req.sanitize(req.body.translations.lang);
    //     req.body.translations.lang = req.sanitize(req.body.translations.word);
    // }
    const response = await wordController.putWordById(id, req.body);
    res.json(response).status(200);
});
module.exports = route;
