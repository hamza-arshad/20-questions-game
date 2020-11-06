const models = require('../../db/models');

const dbBoot = async () => {
  global.db = { models: models() };
}

module.exports = {
  dbBoot,
}