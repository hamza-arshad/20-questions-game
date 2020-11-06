const { getBadRequestObject } = require('../../utils/helper');

const getAllUsersExcept =  async (userId) => {
  const { db: {
    models: {
      User,
    }
  }} = global;
  try {
    return await User.getAllExcept(userId);
  } catch (err){
    throw getBadRequestObject(`Couldn't fetch users: ${JSON.stringify(err)}`);
  }
};

module.exports = { getAllUsersExcept };
