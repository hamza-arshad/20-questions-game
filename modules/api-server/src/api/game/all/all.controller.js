const { OK, ERROR }  = require('../../../utils/helper');
const { getAllByUser } = require('../../../services/game');

exports.all = async (req, res, next) => {
  try {
    const {
      user: {
        userId
      }
    } = req;

    const response = await getAllByUser(userId);
    return OK(res, 'Get All Games', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
