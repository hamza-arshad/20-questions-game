const express = require('express');

const router = express.Router();

const createRoute = require('./create');
const submitAnswerRoute = require('./submitAnswer');

router.use('/create', createRoute);
router.use('/submit-answer', submitAnswerRoute);

module.exports = router;
