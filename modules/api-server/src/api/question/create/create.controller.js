const { OK, ERROR }  = require('../../../utils/helper')
const { create } = require('../../../services/question')

exports.create = async (req, res, next) => {
  try {
    const {
      body: {
        text,
        game_id
      }
    } = req;
    const response = await create( { text, game_id });
    return OK(res, 'Question created successfully!', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
