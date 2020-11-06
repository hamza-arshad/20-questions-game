const { PORT } = require('../../constants');

const serverBoot = (app) => {
  const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  return server;
};

module.exports = {
  serverBoot
};
