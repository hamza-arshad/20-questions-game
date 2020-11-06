const app = require('./config/express');
const { dbBoot } = require('./boot/db');
const { serverBoot } = require('./boot/server');
const { socketBoot } = require('./boot/socket');

const initializeServer = async () => {
  await dbBoot();
  const server = serverBoot(app);
  socketBoot(server);
};

initializeServer();

module.exports = app;