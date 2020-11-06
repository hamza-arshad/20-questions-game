const express = require('express');
const validate = require('express-validation');
const controller = require('./register.controller');
const validator = require('./register.validator');
const router = express.Router();

router.route('/')
  .post(validate(validator.joiSchema), controller.register);

module.exports = router;
