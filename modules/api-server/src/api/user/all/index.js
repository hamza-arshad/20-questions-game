const express = require('express');
const validate = require('express-validation');
const controller = require('./all.controller');
const validator = require('./all.validator');

const router = express.Router();

router.route('/')
    .get(validate(validator.joiSchema), controller.all);

module.exports = router;
