const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('../router');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use('/api', router);

module.exports = app;
