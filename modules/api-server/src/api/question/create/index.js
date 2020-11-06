const express = require('express');
const validate = require('express-validation');
const controller = require('./create.controller');
const validator = require('./create.validator');
const router = express.Router();
const { canAskQuestion } = require('../../../middlewares/game');

router.route('/')
  .post(validate(validator.joiSchema), canAskQuestion, controller.create);

module.exports = router;
