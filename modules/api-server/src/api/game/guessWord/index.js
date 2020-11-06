const express = require('express');
const validate = require('express-validation');
const controller = require('./guessWord.controller');
const validator = require('./guessWord.validator');
const router = express.Router();
const { canGuessWord } = require('../../../middlewares/game');

router.route('/:id')
  .put(validate(validator.joiSchema), canGuessWord, controller.guessWord);

module.exports = router;
