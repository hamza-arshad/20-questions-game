const httpStatus = require('http-status');

const handler = (err, req, res, next) => { // eslint-disable-line
  const response = {
    responseCode: err.status,
    responseMessage: err.message || httpStatus[err.status],
    response: {
      error: err.error,
      stack: err.stack
    }
  };
  if (err.status >= 100 && err.status < 600) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  res.json(response);
  res.end();
};
exports.handler = handler;