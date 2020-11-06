const express = require('express');

const router = express.Router();

const loginRoute = require('./login');
const registerRoute = require('./register');

router.use('/login', loginRoute);
router.use('/register', registerRoute);

module.exports = router;
