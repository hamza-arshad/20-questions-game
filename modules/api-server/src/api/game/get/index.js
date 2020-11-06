const express = require('express');
const validate = require('express-validation');
const controller = require('./get.controller');
const validator = require('./get.validator');

const router = express.Router();

router.route('/:id')
  .get(validate(validator.joiSchema), controller.get);

module.exports = router;
