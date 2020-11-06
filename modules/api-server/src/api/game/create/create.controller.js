const { OK, ERROR }  = require('../../../utils/helper')
const { create } = require('../../../services/game')

exports.create = async (req, res, next) => {
  try {
    const {
      body: {
        word,
        opponent_player,
      },
      user:{
        userId: host_player
      }
    } = req;
    const response = await create( {word, opponent_player, host_player});
    return OK(res, 'Game created successfully!', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
