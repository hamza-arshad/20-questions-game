const SocketService = require('../../services/socket');

const socketBoot = (server) => {
  const io = require('socket.io').listen(server);
  SocketService.listenForConnections(io);
  global.socket = { io };
}

module.exports = {
  socketBoot
}