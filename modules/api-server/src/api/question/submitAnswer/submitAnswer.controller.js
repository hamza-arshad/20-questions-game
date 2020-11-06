const { OK, ERROR }  = require('../../../utils/helper')
const { submitAnswer } = require('../../../services/question')

exports.submitAnswer = async (req, res, next) => {
  try {
    const {
      body: {
        answer
      },
      params: {
        id
      },
      user: {
        userId: currentUserId
      }
    } = req;
    const response = await submitAnswer(id, answer, currentUserId);
    return OK(res, 'Question created successfully!', response);
  } catch (error) {
    return ERROR(res, error.responseMessage, null, error.responseCode);
  }
};
