const express = require('express');

const router = express.Router();

const allRoute = require('./all');

router.use('/all', allRoute);

module.exports = router;
