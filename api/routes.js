require('dotenv').config({ path: '.env' });
const Words = require('./model.js');
const express = require('express');
const router = express.Router();

/* List */
router.get('/', (req, res, next) => {
  Words.find()
    .sort({ date: -1 })
    .exec((err, words) => {
      if (err) return next(err);

      res.json(words);
    });
});

/* Create */
router.post('/', (req, res, next) => {
  if (!req.body.token) res.status(401).json('Missing token');
  if (req.body.token !== process.env.LW)
    res.status(403).json('Incorrect token');

  Words.create(req.body, (err, word) => {
    if (err) return next(err);

    res.json(word);
  });
});

module.exports = router;
