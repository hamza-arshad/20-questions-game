const express = require('express');
const validate = require('express-validation');
const controller = require('./submitAnswer.controller');
const validator = require('./submitAnswer.validator');
const router = express.Router();
const { canAnswerQuestion } = require('../../../middlewares/game');

router.route('/:id')
  .put(validate(validator.joiSchema), canAnswerQuestion, controller.submitAnswer);

module.exports = router;
