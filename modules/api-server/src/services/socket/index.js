function listenForConnections(io) {
  io.on('connection', (socket) => {
    console.log(`New Connection with socket ${socket.id}`);
  });
}

function triggerUpdate(room, data) {
  const { socket: {
    io
  }} = global;
  io.emit(room, data);
}

module.exports = {
  triggerUpdate,
  listenForConnections,
}