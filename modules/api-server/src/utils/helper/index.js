const httpStatus = require('http-status');
const { JWT_SECRET, EXPIRY } = require('../../constants');
const Jwt = require('jsonwebtoken');

const OK = (res, responseMessage = 'OK', response = {}, status = httpStatus.OK) => {
  res.status(status);
  return res.json({
    responseCode: status,
    responseMessage,
    response
  });
};

const ERROR = (res, responseMessage = 'Error', response = {}, status = httpStatus.INTERNAL_SERVER_ERROR) => {
  res.status(status);
  return res.json({
    responseCode: status,
    responseMessage,
    response
  });
};

const getBadRequestObject = (message) => ({
  responseCode: httpStatus.BAD_REQUEST,
  error: true,
  responseMessage: message,
});

const getUnauthorizedRequestObject = (message) => ({
  responseCode: httpStatus.UNAUTHORIZED,
  error: true,
  responseMessage: message,
});

const getNoContentObject = (message) => ({
  responseCode: httpStatus.NO_CONTENT,
  error: true,
  responseMessage: message,
});

const getToken = (user) => {
  return Jwt.sign({
    userId: user.id,
    permission: user.Role.permission,
    email: user.email
  }, JWT_SECRET, {
    expiresIn: EXPIRY,
  })
}

module.exports = {
  OK,
  ERROR,
  getToken,
  getBadRequestObject,
  getNoContentObject,
  getUnauthorizedRequestObject,
}