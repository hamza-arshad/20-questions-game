const express = require('express');

const router = express.Router();
const { validateToken } = require('../middlewares/auth');

const authRoute = require('../api/auth');
const gameRoute = require('../api/game');
const questionRoute = require('../api/question');
const userRoute = require('../api/user');

router.use('/auth', authRoute);
router.use('/game', validateToken, gameRoute);
router.use('/question', validateToken, questionRoute);
router.use('/user', validateToken, userRoute);

module.exports = router;