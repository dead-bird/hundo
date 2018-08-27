const Words = require('./model.js');
const express = require('express');
const router = express.Router();

/* List */
router.get('/', (req, res, next) => {
  Words.find((err, words) => {
    if (err) return next(err);

    res.json(words);
  });
});

/* Create */
router.post('/', (req, res, next) => {
  Words.create(req.body, (err, word) => {
    if (err) return next(err);

    res.json(word);
  });
});

module.exports = router;
