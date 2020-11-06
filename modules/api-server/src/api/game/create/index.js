const express = require('express');
const validate = require('express-validation');
const controller = require('./create.controller');
const validator = require('./create.validator');
const router = express.Router();

router.route('/')
  .post(validate(validator.joiSchema), controller.create);

module.exports = router;
