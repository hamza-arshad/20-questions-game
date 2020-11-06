const Joi = require('joi');

module.exports = {
  name: 'register',
  path: '/api/question/create',
  type: 'post',
  joiSchema: {
    headers: Joi.object({
      authorization: Joi.string().required().strict()
    }).options({ stripUnknown: true }),
    body: Joi.object({
      text: Joi.string().min(1).required().strict(),
      game_id: Joi.string().min(1).required().strict(),
    }).options({ stripUnknown: true }),
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
