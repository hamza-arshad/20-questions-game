const Jwt = require('express-jwt');
const { JWT_SECRET } = require('../../constants');

function getToken(req) {
  let { headers } = req;
  if (headers && headers.authorization) {
    return headers.authorization.split(' ')[1];
  }
  return null
}

const validateToken = Jwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
  getToken,
});

module.exports = {
  validateToken
}
