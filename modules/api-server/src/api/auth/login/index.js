const express = require('express');
const validate = require('express-validation');
const controller = require('./login.controller');
const validator = require('./login.validator');

const router = express.Router();

router.route('/')
  .post(validate(validator.joiSchema), controller.login);

module.exports = router;
