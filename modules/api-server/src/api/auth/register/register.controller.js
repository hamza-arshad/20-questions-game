const {OK, ERROR}  = require('../../../utils/helper')
const {register} = require('../../../services/auth')

exports.register = async (req, res, next) => {
  try {
    const {
      body: {
        name,
        email,
        password,
        role
      },
    } = req;
    const response = await register(name, email, password, true, role, res);
    return OK(res, 'Successful Registration', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
