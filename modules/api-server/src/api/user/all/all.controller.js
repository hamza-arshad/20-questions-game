const { OK, ERROR }  = require('../../../utils/helper');
const { getAllUsersExcept } = require('../../../services/user');

exports.all = async (req, res, next) => {
  try {
    const {
      user: {
        userId
      }
    } = req;

    const response = await getAllUsersExcept(userId);
    return OK(res, 'Get All Users', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
