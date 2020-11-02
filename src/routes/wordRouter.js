/* ------------ Requiring Packages ------------ */
const express = require('express');
const route = express.Router();
const wordController = require('../controllers/wordController');
const sanitizerHelper = require('../helpers/sanitizerHelperFunctions');
const sanitizer = require('express-sanitizer');
const validate = require('../utils/wordsValidators');
const {validationResult} = require('express-validator/check');

/* ------------ Route Config ------------ */
route.use(sanitizer());

/* ---------- Routing ---------- */
route.get('/', validate('getWords'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const response = await wordController.getWords();
        res.json(response).status(200);
    }
});

route.post('/', validate('postWord'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        await sanitizerHelper.sanitizeWord(req);
        const response = await wordController.postWord(req.body);
        res.json(response).status(200);
    }
});

route.delete('/:id', validate('deleteWordById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const response = await wordController.deleteWord(req.params.id);
        res.json(response).status(200);
    }
});

route.get('/:id', validate('getWordById'), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.send(err.mapped()).status(400);
    } else {
        const id = req.params.id;
        const response = await wordController.getWordById(id);
        res.json(response).status(200);
    }

});
route.put('/:id',validate('putWordById') ,async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        res.send(err.mapped()).status(400);

    }else{
    const response = await wordController.putWordById(id, req.body);
    res.json(response).status(200);
     }
});
/**
 * module exports the router for words collections.
 * @exports {Router}
 */
module.exports = route;
