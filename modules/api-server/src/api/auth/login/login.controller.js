const { OK, ERROR }  = require('../../../utils/helper')
const { login } = require('../../../services/auth')

exports.login = async (req, res, next) => {
  try {
    const {
      body:{
        email,
        password
      }
    } = req;
    const response = await login(email, password, res);
    return OK(res, 'Logged In!', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
