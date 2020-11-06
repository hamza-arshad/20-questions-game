const express = require('express');

const router = express.Router();

const allRoute = require('./all');
const createRoute = require('./create');
const getRoute = require('./get');
const guessWordRoute = require('./guessWord');

router.use('/all', allRoute);
router.use('/create', createRoute);
router.use('/', getRoute);
router.use('/guess-word', guessWordRoute);

module.exports = router;
