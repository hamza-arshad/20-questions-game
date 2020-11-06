const { OK, ERROR }  = require('../../../utils/helper');
const { get } = require('../../../services/game');

exports.get = async (req, res, next) => {
  try {
    const {
      params:{
       id
      }
    } = req;

    const response = await get(id);
    return OK(res, 'Get Game', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
