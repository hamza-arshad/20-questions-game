const { OK, ERROR }  = require('../../../utils/helper')
const { guessWord } = require('../../../services/game')

exports.guessWord = async (req, res, next) => {
  try {
    const {
      body: {
        word
      },
      params: {
        id
      },
    } = req;
    const response = await guessWord(id, word);
    return OK(res, 'Question created successfully!', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
